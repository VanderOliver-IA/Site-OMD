---
name: Layout Replication Guide
description: Detailed guide on how to reproduce the specific responsive layout behaviors for Floating Logo and Dynamic Back-to-Top buttons as seen in the OBA project.
---

# Layout Replication Guide / Guia de Reprodução de Layout

This guide details how to implement the specific layout behaviors for the **Floating Logo** and **Dynamic Back-to-Top** button, covering both Desktop and Mobile strategies.
Este guia detalha como implementar os comportamentos de layout específicos para a **Logo Flutuante** e o botão **Voltar ao Topo Dinâmico**, cobrindo estratégias para Desktop e Mobile.

---

## 🏗 Core Concept / Conceito Central

The layout relies on a centralized JavaScript manager (e.g., `layout.js`) to inject fixed elements into the DOM and manage scroll events to toggle CSS classes.
O layout depende de um gerenciador JavaScript centralizado (ex: `layout.js`) para injetar elementos fixos no DOM e gerenciar eventos de rolagem para alternar classes CSS.

### Essential Structure / Estrutura Essencial (HTML)

All floating elements should be outside the main content flow, preferably direct children of `<body>`.
Todos os elementos flutuantes devem estar fora do fluxo principal, preferencialmente filhos diretos de `<body>`.

```html
<!-- Container for all floating widgets -->
<div id="floating-elements-container">
    
    <!-- 1. Floating Logo -->
    <div id="floating-logo" class="floating-logo">
        <img src="path/to/logo.png" alt="Logo">
    </div>

    <!-- 2. Dynamic Back to Top -->
    <div id="scrollTop" class="scroll-top">
        <svg viewBox="0 0 100 100">
            <circle class="progress-background" cx="50" cy="50" r="48"></circle>
            <circle class="progress-bar" cx="50" cy="50" r="48"></circle>
        </svg>
        <i class="fas fa-arrow-up"></i>
    </div>

    <!-- 3. WhatsApp (Mobile Right / Desktop Right) -->
    <a href="#" class="float-wa"><i class="fab fa-whatsapp"></i></a>

    <!-- 4. Mobile App Bar (Mobile Only) -->
    <nav class="mobile-app-bar">...</nav>
</div>
```

---

## 🖥 A. Desktop Layout

### 1. Floating Logo Behavior / Comportamento da Logo Flutuante

**Behavior/Comportamento:**
- **Initial:** Fixed at the **Top-Left** corner.
- **Scroll:** Moves smoothly to the **Bottom-Left** corner.
- **Inicial:** Fixa no canto **Superior Esquerdo**.
- **Rolagem:** Move-se suavemente para o canto **Inferior Esquerdo**.

**CSS Implementation:**

```css
/* Base Style (Initial - Top Left) */
.floating-logo {
    position: fixed;
    top: 20px;       /* Distance from top */
    left: 20px;      /* Distance from left */
    z-index: 2000;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55); /* Smooth transition */
    width: 220px;    /* Desktop Size */
}

/* Scrolled State (Bottom Left) */
.floating-logo.scrolled {
    top: auto;       /* Release top */
    bottom: 20px;    /* Stick to bottom */
    width: 100px;    /* Optional: Shrink size */
    left: 20px;      /* Keep left alignment */
}
```

**JS Logic:**
Detect scroll > 0 (or a small threshold) to toggle the class.
Detectar rolagem > 0 (ou um pequeno limite) para alternar a classe.

---

### 2. Dynamic Back-to-Top / Voltar ao Topo Dinâmico

**Behavior/Comportamento:**
- **Visual:** A circle that fills up as the user scrolls down.
- **Position:** Bottom right (usually) or aligned with other widgets.
- **Interaction:** Clicks scroll to top smoothy.
- **Visual:** Um círculo que se preenche conforme o usuário desce a tela.
- **Posição:** Canto inferior direito (geralmente) ou alinhado com outros widgets.
- **Interação:** Clique rola para o topo suavemente.

**CSS Styling:**

```css
.scroll-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
}

.scroll-top.visible {
    opacity: 1;
    visibility: visible;
}

/* SVG Circular Progress Logic */
.progress-bar {
    fill: none;
    stroke: var(--primary-color);
    stroke-width: 4;
    stroke-dasharray: 301.59; /* Circumference = 2 * PI * r (48) */
    stroke-dashoffset: 301.59; /* Initially empty */
    transition: stroke-dashoffset 0.1s linear;
}
```

**JS Logic (Calculation):**

```javascript
const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
const scrollProgress = window.scrollY / scrollTotal;
const circumference = 301.59; 
const offset = circumference - (scrollProgress * circumference);
progressBar.style.strokeDashoffset = offset;
```

---

## 📱 B. Mobile Layout

### 1. Floating Logo Behavior / Comportamento da Logo Flutuante

**Behavior/Comportamento:**
- **Initial:** Fixed at the **Top Center**. Large and visible.
- **Scroll:** Moves to **Bottom-Left**, positioned **ABOVE** the Mobile App Bar.
- **Inicial:** Fixa no **Topo ao Centro**. Grande e visível.
- **Rolagem:** Move-se para o canto **Inferior Esquerdo**, posicionada **ACIMA** da Barra de App Mobile.

**CSS Implementation (Media Query < 900px):**

```css
@media (max-width: 900px) {
    /* Initial State (Top Center) */
    .floating-logo {
        top: 10px;
        left: 50%;
        transform: translateX(-50%); /* Center horizontally */
        bottom: auto;
        width: 160px; /* Mobile Size */
    }

    /* Scrolled State (Bottom Left) */
    .floating-logo.mobile-scrolled {
        top: auto;
        bottom: 80px; /* IMPORTANT: Height of App Bar + Padding */
        left: 15px;
        transform: none; /* Remove centering */
        width: 60px; /* Shrink iconic size */
    }
}
```

### 2 & 3. Back-to-Top Mobile & Alignment / Alinhamento Mobile

**Requirement/Requisito:**
The "Back to Top" button must be centered, aligned horizontally with the Logo (Left) and WhatsApp (Right), all sitting above the App Menu.
O botão "Voltar ao Topo" deve ficar centralizado, alinhado horizontalmente com a Logo (Esquerda) e WhatsApp (Direita), todos acima do Menu de App.

**CSS Layout Strategy:**

```css
@media (max-width: 900px) {
    /* 1. Logo (Left) */
    .floating-logo.mobile-scrolled {
        bottom: 80px !important;
        left: 15px !important;
    }

    /* 2. Back to Top (Center) */
    .scroll-top {
        bottom: 95px !important; /* Slightly higher/aligned visually */
        left: 50% !important;
        right: auto !important;
        transform: translateX(-50%) !important; /* Perfect Center */
        z-index: 1001; /* Above decorations */
    }

    /* 3. WhatsApp (Right) */
    .float-wa {
        bottom: 80px !important;
        right: 15px !important;
        left: auto !important;
    }

    /* 4. App Bar (Fixed Bottom) */
    .mobile-app-bar {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        height: 60px;
        z-index: 1000;
        /* Glassmorphism styles... */
    }
}
```

### Complete JS Logic / Lógica JS Completa

```javascript
window.addEventListener('scroll', () => {
    // Desktop Logic
    const logoLabel = document.querySelector('.floating-logo');
    if (window.innerWidth > 900) {
        if (window.scrollY > 50) logoLabel.classList.add('scrolled');
        else logoLabel.classList.remove('scrolled');
    }
    
    // Mobile Logic
    if (window.innerWidth <= 900) {
        if (window.scrollY > 50) logoLabel.classList.add('mobile-scrolled');
        else logoLabel.classList.remove('mobile-scrolled');
    }

    // Logic for Back to Top Visibility remains the same
});
```
