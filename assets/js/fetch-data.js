// Fetch and Render Services from Supabase
async function loadServices() {
    const container = document.querySelector('.services-grid');
    if (!container) return;

    // Show loading state (optional, or keeping static content as skeleton)
    // container.innerHTML = '<p>Carregando serviços...</p>';

    const { data: services, error } = await supabaseClient
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error loading services:', error);
        return;
    }

    if (!services || services.length === 0) {
        container.innerHTML = '<p>Nenhum serviço encontrado.</p>';
        return;
    }

    // Clear static content
    container.innerHTML = '';

    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card animate-on-scroll';

        // Map icon name to Material Icon or SVG path if needed
        const iconHtml = service.icon_name.includes('/')
            ? `<img src="${service.icon_name}" alt="${service.title}" style="width:40px; height:40px; margin-bottom:1rem;">`
            : `<span class="material-icons" style="font-size: 2.5rem; color: var(--primary-cyan); margin-bottom: 1rem;">${service.icon_name}</span>`;

        card.innerHTML = `
            ${iconHtml}
            <h3>${service.title}</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">${service.description}</p>
            <a href="${service.link_url || '#'}" style="color: var(--primary-cyan);">Saiba mais &rarr;</a>
        `;

        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', loadServices);
