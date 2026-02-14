<footer class="site-footer">
    <div class="container footer-grid">
        <div class="footer-col">
            <h3 class="logo" style="margin-bottom: var(--spacing-sm);">OMD<span class="text-gradient">2026</span></h3>
            <p style="color: var(--text-secondary); max-width: 300px;">
                Transformando confusão em clareza estratégica. O seu Hub de Inteligência Digital.
            </p>
        </div>
        
        <div class="footer-col">
            <h4>Navegação</h4>
            <ul style="display: flex; flex-direction: column; gap: 0.5rem;">
                <li><a href="#problem">O Problema</a></li>
                <li><a href="#hub">Nosso Método</a></li>
                <li><a href="#services">Serviços</a></li>
                <li><a href="#diagnostic">Diagnóstico</a></li>
            </ul>
        </div>

        <div class="footer-col">
            <h4>Conecte-se</h4>
            <ul style="display: flex; flex-direction: column; gap: 0.5rem;">
                <li><a href="#">Instagram</a></li>
                <li><a href="#">LinkedIn</a></li>
                <li><a href="#">WhatsApp</a></li>
            </ul>
        </div>
    </div>
        <div class="footer-bottom">
        <div class="container" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0;">
            <p>&copy; 2026 OláMundoDigital. Todos os direitos reservados.</p>
            <a href="admin/login.php" style="opacity: 0.3; font-size: 0.8rem; color: var(--text-secondary); text-decoration: none;">Admin</a>
        </div>
    </div>
</footer>


<!-- Floating Mobile Actions (Above Bottom Nav) -->
<div class="floating-actions-bar">
    <!-- Left: Placeholder for Parallax Hero Logo -->
    <div class="fab-placeholder"></div>

    <!-- Center: Scroll to Top with Progress -->
    <button id="scrollTopBtn" class="floating-btn fab-scroll-top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
        <svg class="progress-ring" width="55" height="55">
            <circle class="progress-ring__circle" stroke="var(--primary-cyan)" stroke-width="2" fill="transparent" r="26" cx="27.5" cy="27.5" />
        </svg>
        <span class="material-icons" style="color: var(--primary-cyan); font-size: 1.5rem;">arrow_upward</span>
    </button>

    <!-- Right: WhatsApp -->
    <a href="https://wa.me/5521999999999" target="_blank" class="floating-btn fab-whatsapp">
        <span class="material-icons">chat</span>
    </a>
</div>

<!-- Mobile Bottom Navigation -->
<nav class="mobile-bottom-nav">
    <a href="index.php" class="mobile-nav-item active">
        <span class="material-icons">home</span>
        <span class="label">Início</span>
    </a>
    <a href="#services" class="mobile-nav-item">
        <span class="material-icons">grid_view</span>
        <span class="label">Serviços</span>
    </a>
    <a href="#hub" class="mobile-nav-item">
        <span class="material-icons">hub</span>
        <span class="label">O Hub</span>
    </a>
    <a href="#blog" class="mobile-nav-item">
        <span class="material-icons">article</span>
        <span class="label">Blog</span>
    </a>
    <a href="#about" class="mobile-nav-item">
        <span class="material-icons">groups</span> <!-- Or 'contact_support' -->
        <span class="label">Quem</span>
    </a>
</nav>

<!-- Floating Action Buttons (Mobile) -->
<div class="mobile-fabs">
    <a href="https://wa.me/5521998743504?text=Quero%20um%20Diagnóstico%20Estratégico" class="fab fab-whatsapp" target="_blank" aria-label="WhatsApp">
        <img src="assets/img/icones-svg/contato.svg" alt="WhatsApp" style="width: 24px; height: 24px; filter: brightness(0) invert(1);"> 
    </a>
    <button id="scrollToTop" class="fab fab-top" aria-label="Voltar ao Topo">
        <span class="material-icons">arrow_upward</span>
    </button>
</div>

<!-- Dynamic Logo Container (Mobile) -->
<div id="mobile-dynamic-logo" class="mobile-dynamic-logo hidden">
    <img src="assets/img/logo-omd.png" alt="OMD" style="height: 40px;">
</div>
