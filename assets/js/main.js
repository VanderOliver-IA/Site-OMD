document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile "Viajante" Logo (CSS Class Strategy) ---
    const mobileLogo = document.getElementById('mobileHeroLogo');
    const floatBar = document.querySelector('.floating-actions-bar');
    const fabScrollBtn = document.getElementById('scrollTopBtn');

    // Config: Thresholds
    const SCROLL_THRESHOLD = 50; // Start triggering early

    function handleScrollAnimations() {
        const scrollY = window.scrollY;

        // A. Logo "Viajante" Logic
        if (mobileLogo) {
            if (scrollY > SCROLL_THRESHOLD) {
                // Scrolled Mode: Add Class to trigger CSS Transition
                mobileLogo.classList.add('mobile-scrolled');
                // Ensure text/content below isn't obscured if fixed initially
            } else {
                // Hero Mode: Remove Class
                mobileLogo.classList.remove('mobile-scrolled');
            }
        }

        // B. Floating Bar Visibility
        if (floatBar) {
            if (scrollY > SCROLL_THRESHOLD) {
                floatBar.classList.add('visible');
            } else {
                floatBar.classList.remove('visible');
            }
        }

        // C. Scroll Top Button
        // Only show button if we are DEEP in the page (e.g. > 300px)
        if (fabScrollBtn) {
            if (scrollY > 300) {
                fabScrollBtn.style.opacity = '1';
                fabScrollBtn.style.pointerEvents = 'auto';
            } else {
                fabScrollBtn.style.opacity = '0';
                fabScrollBtn.style.pointerEvents = 'none';
            }
        }
    }

    // Optimization: Request Animation Frame
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScrollAnimations();
                updateProgress(); // Keep ring updating
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial Trigger
    handleScrollAnimations();

    // --- 2. Scroll Progress Ring & FAB Visibility ---
    const progressCircle = document.querySelector('.progress-ring__circle');
    if (progressCircle && fabScrollBtn) {
        const radius = progressCircle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;

        // Setup SVG
        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        progressCircle.style.strokeDashoffset = circumference;

        function updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            // Only update the SVG ring
            const offset = circumference - (scrollPercent / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }

        // Note: Scroll event listener is now handled by the optimized RequestAnimationFrame loop above.
        // We just need to make sure updateProgress is available to be called by it.
    }

    // --- 3. Active Nav State (Intersection Observer) ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.mobile-nav-item');

    if (sections.length > 0 && navLinks.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    if (id) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            const href = link.getAttribute('href');
                            if (href && href.includes(id)) {
                                link.classList.add('active');
                            }
                        });
                    }
                }
            });
        }, { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" });

        sections.forEach(section => observer.observe(section));
    }

    // --- 5. Desktop Logo Parallax & Drag ---
    const desktopLogo = document.querySelector('.desktop-floating-logo');
    const closeBtn = document.querySelector('.desktop-floating-logo .close-btn');

    if (desktopLogo) {
        // A. Parallax Effect (Mouse Move)
        document.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 768 && !isDragging) {
                const x = (window.innerWidth - e.pageX * 2) / 50; // Sensitivity 50
                const y = (window.innerHeight - e.pageY * 2) / 50;

                // Only apply if not dragging
                desktopLogo.style.transform = `translate(${x}px, ${y}px)`;
            }
        });

        // B. Toggle Visibility on Close
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Don't trigger drag
                desktopLogo.style.opacity = '0';
                setTimeout(() => desktopLogo.style.display = 'none', 300);
            });
        }

        // C. Simple Drag Logic
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        desktopLogo.addEventListener("mousedown", dragStart);
        document.addEventListener("mouseup", dragEnd);
        document.addEventListener("mousemove", drag);

        function dragStart(e) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;

            if (e.target === desktopLogo || e.target.tagName === 'IMG') {
                isDragging = true;
                desktopLogo.style.cursor = 'grabbing';
            }
        }

        function dragEnd(e) {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
            desktopLogo.style.cursor = 'grab';
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                xOffset = currentX;
                yOffset = currentY;
                setTranslate(currentX, currentY, desktopLogo);
            }
        }

        function setTranslate(xPos, yPos, el) {
            el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        }
    }

    // --- 4. Smooth Scroll for Anchors ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 6. Lead Capture Form Handler (n8n Integration) ---
    const leadForm = document.getElementById('leadCaptureForm');
    const formFeedback = document.getElementById('formFeedback');

    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = leadForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            // Loading state
            submitBtn.textContent = 'Enviando ao Hub OMD...';
            submitBtn.disabled = true;

            const formData = new FormData(leadForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message'),
                source: window.location.hostname
            };

            try {
                // n8n Webhook URL (from our workflow)
                const N8N_WEBHOOK_URL = 'https://n8n.olamundodigital.cloud/webhook/omd-leads';

                const response = await fetch(N8N_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    leadForm.style.display = 'none';
                    formFeedback.style.display = 'block';
                } else {
                    throw new Error('Falha no envio');
                }
            } catch (err) {
                console.error('Lead error:', err);
                alert('Ops! Tivemos um pequeno problema. Pode tentar novamente ou nos chamar no Zap?');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

});
