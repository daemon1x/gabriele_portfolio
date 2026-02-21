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
    gsap.set('.hero-image-float', { autoAlpha: 0 });
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

        const hoverTargets = 'a, button, .grid-item, .h-scroll-item, .skill-tag, .nav-menu-btn';
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

    // ---- Smooth Scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 0;
                const top = target.getBoundingClientRect().top + window.scrollY + offset;
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
            duration: 1.5,
            ease: 'power3.out'
        }, '-=0.6')
        .to('.hero-scroll', {
            autoAlpha: 1,
            y: 0,
            duration: 1
        }, '-=0.5');
    }

    // ---- Scroll-triggered Reveal Animations ----
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

        document.querySelectorAll('.reveal-up').forEach((el, i) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'expo.out',
                delay: (i % 4) * 0.08,
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

    // ---- Marquee Speed on Scroll ----
    function initMarquee() {
        const marqueeTrack = document.querySelector('.marquee-track');
        if (!marqueeTrack) return;

        let scrollVelocity = 0;

        ScrollTrigger.create({
            trigger: '.marquee-section',
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
                scrollVelocity = self.getVelocity() / 500;
                const speed = Math.max(10, 30 - Math.abs(scrollVelocity));
                marqueeTrack.style.animationDuration = speed + 's';
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

        document.querySelectorAll('.grid-item img, .case-img img, .h-scroll-item img').forEach(img => {
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

    // ---- Section Divider Lines ----
    function initSectionLines() {
        document.querySelectorAll('.section-label').forEach(label => {
            gsap.from(label.querySelector('.section-name::before'), {
                scaleX: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: label,
                    start: 'top 85%'
                }
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

    // ---- Active Nav Link Highlight ----
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

    // ---- Initialize Everything ----
    function init() {
        initRevealAnimations();
        initHorizontalScroll();
        initParallax();
        initMarquee();
        initLightbox();
        initGridAnimations();
        initSectionLines();
        initMagnetic();
        initActiveNav();

        ScrollTrigger.refresh();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
