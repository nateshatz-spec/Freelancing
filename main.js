document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for sticky nav
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.service-card, .showcase, .cta-box, h2');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Only reveal once
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        revealObserver.observe(el);
    });

    // CSS class for revealed state (added via JS to avoid flicker)
    const style = document.createElement('style');
    style.innerHTML = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // 3. Form Submission Simulation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = contactForm.querySelector('input').value;
            const btn = contactForm.querySelector('button');
            
            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Booking Confirmed!';
                btn.style.background = '#10b981';
                contactForm.querySelector('input').value = '';
                
                setTimeout(() => {
                    btn.textContent = 'Book a Discovery Call';
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 4. Parallax Effect for Glow Overlay
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const glow = document.querySelector('.glow-overlay');
        if (glow) {
            glow.style.transform = `translate(${(x - 0.5) * 20}px, ${(y - 0.5) * 20}px)`;
        }
    });

    // 5. Stat Box Click Animation
    document.querySelectorAll('.stat-box').forEach(box => {
        box.addEventListener('click', () => {
            box.style.transform = 'scale(0.95)';
            setTimeout(() => {
                box.style.transform = 'scale(1)';
            }, 100);
        });
    });
});
