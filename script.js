/* ============================================
   GABRIELE GERULAITITE — PORTFOLIO SCRIPTS
   ============================================ */

(function () {
    'use strict';

    gsap.registerPlugin(ScrollTrigger);

    // ---- Immediately hide hero elements via GSAP ----
    gsap.set('.hero-subtitle-text', { y: '100%' });
    gsap.set('.hero-title-line', { y: '110%' });
    gsap.set('.hero-role-text', { y: '100%' });
    gsap.set('.hero-image-float', { autoAlpha: 0, y: 30 });
    gsap.set('.hero-scroll', { autoAlpha: 0, y: 20 });

    // ---- Preloader ----
    const preloader = document.getElementById('preloader');

    function startSite() {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
                preloader.style.display = 'none';
                animateHero();
            }
        });
    }

    if (document.readyState === 'complete') {
        setTimeout(startSite, 1200);
    } else {
        window.addEventListener('load', () => {
            setTimeout(startSite, 1200);
        });
    }

    // ---- Hero Canvas Particles ----
    function initHeroCanvas() {
        const canvas = document.getElementById('heroCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: -1000, y: -1000 };
        let w, h;

        function resize() {
            w = canvas.width = canvas.offsetWidth;
            h = canvas.height = canvas.offsetHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        canvas.parentElement.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        const count = Math.min(80, Math.floor(w * h / 15000));

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                r: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.4 + 0.1
            });
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;

                const dxm = p.x - mouse.x;
                const dym = p.y - mouse.y;
                const distMouse = Math.sqrt(dxm * dxm + dym * dym);
                const mouseRadius = 150;

                if (distMouse < mouseRadius) {
                    const force = (1 - distMouse / mouseRadius) * 0.02;
                    p.vx += dxm * force;
                    p.vy += dym * force;
                }

                p.vx *= 0.99;
                p.vy *= 0.99;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 169, 126, ${p.alpha})`;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(200, 169, 126, ${0.06 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(draw);
        }
        draw();
    }

    // ---- Custom Cursor ----
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function updateCursor() {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            followerX += (mouseX - followerX) * 0.08;
            followerY += (mouseY - followerY) * 0.08;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';

            requestAnimationFrame(updateCursor);
        }
        updateCursor();

        const hoverTargets = 'a, button, .grid-item, .h-scroll-item, .skill-tag, .nav-menu-btn, .edu-card, .exhibition-link';
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(hoverTargets)) {
                document.body.classList.add('cursor-hover');
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(hoverTargets)) {
                document.body.classList.remove('cursor-hover');
            }
        });
    }

    // ---- Scroll Progress ----
    function initScrollProgress() {
        const bar = document.getElementById('scrollProgress');
        if (!bar) return;
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = (scrolled / total * 100) + '%';
        });
    }

    // ---- Navigation ----
    const nav = document.getElementById('nav');
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    let menuOpen = false;

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 80);
    });

    menuBtn.addEventListener('click', () => {
        menuOpen = !menuOpen;
        menuBtn.classList.toggle('active', menuOpen);
        mobileMenu.classList.toggle('active', menuOpen);
        document.body.style.overflow = menuOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            menuOpen = false;
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ---- Smooth Scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const top = target.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- Hero Animation ----
    function animateHero() {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

        tl.to('.hero-subtitle-text', {
            y: 0,
            duration: 1.2,
            delay: 0.1
        })
        .to('.hero-title-line', {
            y: 0,
            duration: 1.4,
            stagger: 0.15
        }, '-=0.8')
        .to('.hero-role-text', {
            y: 0,
            duration: 1.2
        }, '-=0.8')
        .to('.hero-image-float', {
            autoAlpha: 1,
            y: 0,
            duration: 1.5,
            ease: 'power3.out'
        }, '-=0.6')
        .to('.hero-scroll', {
            autoAlpha: 1,
            y: 0,
            duration: 1
        }, '-=0.5');
    }

    // ---- Scroll-triggered Reveals ----
    function initRevealAnimations() {
        document.querySelectorAll('.reveal-text').forEach(el => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });

        document.querySelectorAll('.reveal-up').forEach((el) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }

    // ---- Horizontal Scroll Sections ----
    function initHorizontalScroll() {
        document.querySelectorAll('.horizontal-scroll').forEach(track => {
            const speed = parseFloat(track.dataset.speed) || 1;
            gsap.to(track, {
                x: () => speed > 0 ? -200 : 200,
                ease: 'none',
                scrollTrigger: {
                    trigger: track.closest('.horizontal-scroll-wrap'),
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        });
    }

    // ---- Parallax Effects ----
    function initParallax() {
        document.querySelectorAll('[data-speed]').forEach(el => {
            if (el.closest('.horizontal-scroll')) return;
            const speed = parseFloat(el.dataset.speed);
            gsap.to(el, {
                y: () => (1 - speed) * 100,
                ease: 'none',
                scrollTrigger: {
                    trigger: el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        });

        gsap.to('.hero-content', {
            y: 150,
            opacity: 0.3,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });

        gsap.to('.hero-image-float', {
            y: 80,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    }

    // ---- GSAP-driven Marquee (no CSS animation = no jitter) ----
    function initMarquee() {
        const track = document.querySelector('.marquee-track');
        if (!track) return;

        const trackWidth = track.scrollWidth / 2;

        gsap.set(track, { x: 0 });

        gsap.to(track, {
            x: -trackWidth,
            duration: 40,
            ease: 'none',
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % trackWidth)
            }
        });

        let skewProxy = { skew: 0 };
        let clamp = gsap.utils.clamp(-6, 6);

        ScrollTrigger.create({
            trigger: '.marquee-section',
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
                let skew = clamp(self.getVelocity() / 300);
                gsap.to(skewProxy, {
                    skew: skew,
                    duration: 0.3,
                    overwrite: true,
                    onUpdate: () => {
                        track.style.transform = track.style.transform.replace(/skewX\([^)]*\)/, '') + ` skewX(${skewProxy.skew}deg)`;
                    }
                });
            }
        });
    }

    // ---- Image Lightbox ----
    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const closeBtn = document.getElementById('lightboxClose');
        const prevBtn = document.getElementById('lightboxPrev');
        const nextBtn = document.getElementById('lightboxNext');

        let allImages = [];
        let currentIndex = 0;

        document.querySelectorAll('.grid-item img, .case-img img, .h-scroll-item img, .exhibition-img-main img').forEach(img => {
            allImages.push(img.src);
            img.addEventListener('click', () => {
                currentIndex = allImages.indexOf(img.src);
                openLightbox(img.src);
            });
        });

        function openLightbox(src) {
            lightboxImg.src = src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
            lightboxImg.src = allImages[currentIndex];
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % allImages.length;
            lightboxImg.src = allImages[currentIndex];
        }

        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', showPrev);
        nextBtn.addEventListener('click', showNext);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        });
    }

    // ---- Staggered Grid Entry ----
    function initGridAnimations() {
        document.querySelectorAll('.masonry-grid').forEach(grid => {
            const items = grid.querySelectorAll('.grid-item');
            items.forEach((item, i) => {
                gsap.to(item, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'expo.out',
                    delay: (i % 3) * 0.1,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 92%',
                        toggleActions: 'play none none none'
                    }
                });
            });
        });
    }

    // ---- 3D Tilt on Cards ----
    function initTiltEffect() {
        if (window.innerWidth <= 768) return;

        document.querySelectorAll('[data-tilt]').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                const tiltX = (0.5 - y) * 12;
                const tiltY = (x - 0.5) * 12;

                gsap.to(card, {
                    rotateX: tiltX,
                    rotateY: tiltY,
                    duration: 0.5,
                    ease: 'power2.out',
                    transformPerspective: 800,
                    transformOrigin: 'center'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.7,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
    }

    // ---- Magnetic Buttons ----
    function initMagnetic() {
        if (window.innerWidth <= 768) return;

        document.querySelectorAll('.magnetic').forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(el, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.4)'
                });
            });
        });
    }

    // ---- Active Nav Link ----
    function initActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 200;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === '#' + current) {
                    link.style.color = 'var(--accent)';
                }
            });
        });
    }

    // ---- Section Reveal Lines ----
    function initSectionDividers() {
        document.querySelectorAll('.section').forEach(section => {
            const label = section.querySelector('.section-label');
            if (!label) return;

            gsap.from(label, {
                opacity: 0,
                x: -30,
                duration: 1,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: label,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }

    // ---- Smooth Image Reveal with Curtain ----
    function initImageReveals() {
        document.querySelectorAll('.about-img, .case-img--large, .exhibition-img-main').forEach(wrap => {
            const img = wrap.querySelector('img');
            if (!img) return;

            gsap.from(img, {
                scale: 1.2,
                duration: 1.4,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: wrap,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }

    // ---- Initialize ----
    function init() {
        initHeroCanvas();
        initScrollProgress();
        initRevealAnimations();
        initHorizontalScroll();
        initParallax();
        initMarquee();
        initLightbox();
        initGridAnimations();
        initTiltEffect();
        initMagnetic();
        initActiveNav();
        initSectionDividers();
        initImageReveals();

        ScrollTrigger.refresh();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
