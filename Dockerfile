# =============================================
# STAGE 1: Build do Dashboard React (CRM)
# =============================================
FROM node:18-alpine AS dashboard-builder

WORKDIR /app/dashboard
COPY dashboard/package.json dashboard/package-lock.json ./
RUN npm ci --production=false
COPY dashboard/ ./
RUN npm run build

# =============================================
# STAGE 2: PHP + Apache (Site + CRM)
# =============================================
FROM php:8.1-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql mysqli

# Enable Apache modules
RUN a2enmod rewrite headers

# Set working directory
WORKDIR /var/www/html

# Copy PHP application files (site principal)
COPY . /var/www/html/

# Copy React Dashboard build to /crm/ subroute
COPY --from=dashboard-builder /app/dashboard/dist /var/www/html/crm/

# Remove files we don't need in production
RUN rm -rf /var/www/html/dashboard/node_modules \
    /var/www/html/dashboard/src \
    /var/www/html/.agent \
    /var/www/html/docs \
    /var/www/html/test_n8n.py \
    /var/www/html/update_n8n.py

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
