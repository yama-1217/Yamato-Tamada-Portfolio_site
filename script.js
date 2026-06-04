document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    // Scroll Reveal
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .work-item, .about-desc, .hero-title span').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.innerHTML = `
        .visible { opacity: 1 !important; transform: translateY(0) !important; }
    `;
    document.head.appendChild(style);



    // Magnetic Buttons (Simple implementation)
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        // Show/hide button on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        // Scroll to top on click
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navList.classList.toggle('active');

            // Prevent scrolling when menu is open
            if (navList.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Scroll Position Persistence ---
    const SCROLL_KEY = 'works_scroll_pos';
    const isWorksPage = window.location.pathname.includes('works.html') ||
        (window.location.pathname.includes('index.html') || window.location.pathname === '/');

    // Restore scroll position
    if (isWorksPage) {
        const savedPos = sessionStorage.getItem(SCROLL_KEY);
        if (savedPos) {
            // Use a small timeout to ensure layout is ready
            setTimeout(() => {
                window.scrollTo({
                    top: parseInt(savedPos, 10),
                    behavior: 'auto' // Instant jump is usually better for restoration
                });
                sessionStorage.removeItem(SCROLL_KEY);
            }, 100);
        }
    }

    // Save scroll position when clicking a work link
    document.querySelectorAll('.work-link').forEach(link => {
        link.addEventListener('click', () => {
            if (isWorksPage) {
                sessionStorage.setItem(SCROLL_KEY, window.pageYOffset);
            }
        });
    });

    // --- Dynamic Project Detail Page Content Loading ---
    const gallery = document.getElementById('work-gallery');
    if (gallery) {
        const urlParams = new URLSearchParams(window.location.search);
        const projectFolder = urlParams.get('p');
        const projectTitleJa = urlParams.get('tj') || urlParams.get('t'); // Fallback to 't' if 'tj' is missing
        const projectTitleEn = urlParams.get('te') || projectTitleJa;
        const projectCategory = urlParams.get('c');
        const projectYear = urlParams.get('y');

        if (projectFolder && (projectTitleJa || projectTitleEn)) {
            // Update Page Title
            document.title = `${projectTitleJa || projectTitleEn} | YAMATO TAMADA`;
            // Update Header Title
            const titleJaEl = document.getElementById('work-title-ja');
            const titleEnEl = document.getElementById('work-title-en');
            if (titleJaEl) titleJaEl.textContent = projectTitleJa;
            if (titleEnEl) titleEnEl.textContent = projectTitleEn;
            // Update Meta (Category • Year)
            document.getElementById('work-meta').textContent = projectYear;

            // Populate Gallery
            const gallery = document.getElementById('work-gallery');
            if (gallery) {
                gallery.innerHTML = ''; // Clear fallback content

                // 1. Try loading up to 30 images
                for (let i = 1; i <= 30; i++) {
                    const img = document.createElement('img');
                    const num = i < 10 ? `0${i}` : i;
                    img.src = `images/projects/${projectFolder}/${num}.jpg`;
                    img.alt = `${projectTitleJa || projectTitleEn} - ${num}`;
                    // Handle missing images
                    img.onerror = function () {
                        this.remove(); // Remove the element if image doesn't exist
                    };
                    // Handle orientation detection
                    img.onload = function () {
                        if (this.naturalHeight > this.naturalWidth) {
                            this.classList.add('is-portrait');
                        }
                    };
                    gallery.appendChild(img);
                }

                // 2. Local videos (Check first to keep them near images if needed, or move to end)
                const videoFiles = [
                    'video.mp4', 'video.mov',
                    'video01.mp4', 'video01.mov',
                    'video02.mp4', 'video02.mov',
                    'video03.mp4', 'video03.mov',
                    'video04.mp4', 'video04.mov',
                    'video05.mp4', 'video05.mov'
                ];
                videoFiles.forEach(fileName => {
                    const videoElement = document.createElement('video');
                    videoElement.className = 'work-video';
                    videoElement.controls = true;
                    videoElement.src = `images/projects/${projectFolder}/${fileName}`;
                    videoElement.onloadedmetadata = function () {
                        if (this.videoHeight > this.videoWidth) {
                            this.classList.add('is-portrait');
                        }
                    };
                    videoElement.onerror = function () {
                        this.remove();
                    };
                    gallery.appendChild(videoElement);
                });

                // 3. YouTube videos (Always at the end)
                const youtubeIdsRaw = urlParams.get('v');
                if (youtubeIdsRaw) {
                    youtubeIdsRaw.split(',').forEach(id => {
                        const trimmedId = id.trim();
                        if (trimmedId) {
                            const videoContainer = document.createElement('div');
                            videoContainer.className = 'video-container';
                            videoContainer.innerHTML = `
                                <iframe src="https://www.youtube.com/embed/${trimmedId}?rel=0&origin=${window.location.origin}" 
                                        title="YouTube video player"
                                        frameborder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        referrerpolicy="strict-origin-when-cross-origin"
                                        allowfullscreen></iframe>
                            `;
                            gallery.appendChild(videoContainer);
                        }
                    });
                }
            }
        }
    }

    // --- Language Switcher Logic ---
    const LANG_KEY = 'preferred_lang';
    const body = document.body;
    const langBtns = document.querySelectorAll('.lang-btn');

    // Function to set language
    const setLanguage = (lang) => {
        if (lang === 'en') {
            body.classList.remove('lang-ja');
            body.classList.add('lang-en');
        } else {
            body.classList.remove('lang-en');
            body.classList.add('lang-ja');
        }
        localStorage.setItem(LANG_KEY, lang);
        document.documentElement.lang = lang;

        // Update button states
        langBtns.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    };

    // Initialize language
    const savedLang = localStorage.getItem(LANG_KEY) || 'ja';

    // Ensure initial class is set correctly
    setLanguage(savedLang);

    // Add click listeners to switcher buttons
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.dataset.lang;
            setLanguage(selectedLang);
        });
    });
});
