document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const headerLogo = document.getElementById('header-logo');
    const themeIconLight = document.getElementById('theme-icon-light'); // Sun icon
    const themeIconDark = document.getElementById('theme-icon-dark'); // Moon icon
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    // Function to update theme icons
    const updateThemeIcon = (isDarkMode) => {
        if (themeIconLight && themeIconDark) {
            if (isDarkMode) {
                // Dark mode is active, show sun icon (to switch to light)
                themeIconLight.style.display = 'block';
                themeIconDark.style.display = 'none';
            } else {
                // Light mode is active, show moon icon (to switch to dark)
                themeIconLight.style.display = 'none';
                themeIconDark.style.display = 'block';
            }
        }
    };

    // Function to update logo based on theme
    const updateLogo = (isDarkMode) => {
        if (headerLogo) {
            if (isDarkMode) {
                headerLogo.src = 'images/dark theme/full_banner_transparent.png';
            } else {
                headerLogo.src = 'images/light theme/full_banner_transparent.png';
            }
        }
        
        // Update footer logo as well
        const footerLogo = document.getElementById('footer-logo');
        if (footerLogo) {
            if (isDarkMode) {
                footerLogo.src = 'images/dark theme/initials_only_transparent.png';
            } else {
                footerLogo.src = 'images/light theme/initials_only_transparent.png';
            }
        }
    };

    if (currentTheme) {
        const isDarkMode = currentTheme === 'dark-mode';
        document.body.classList.add(currentTheme);
        updateLogo(isDarkMode);
        updateThemeIcon(isDarkMode);
    } else {
        // Default to light mode, show moon icon
        updateThemeIcon(false);
    }    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            let theme = 'light-mode';
            const isDarkMode = document.body.classList.contains('dark-mode');
            if (isDarkMode) {
                theme = 'dark-mode';
            }
            localStorage.setItem('theme', theme);
            updateLogo(isDarkMode);
            updateThemeIcon(isDarkMode);
        });
    }

    // Sticky Navigation with Fade-in Background
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Smooth Scroll for Anchor Links (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#' && document.querySelector(this.getAttribute('href'))) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll-in Animations for Sections
    const scrollSections = document.querySelectorAll('.scroll-animate'); // Add .scroll-animate to sections in HTML
    const animateOnScroll = () => {
        scrollSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.85) { // Trigger when 85% of the element is visible
                section.classList.add('in-view');
            }
        });
    };
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check on load

    // Project Filtering (for projects.html)
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectTiles = document.querySelectorAll('.projects-grid .project-tile');
    const noProjectsMessage = document.querySelector('.no-projects-message');

    if (filterButtons.length > 0 && projectTiles.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Active button state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.dataset.filter;

                let visibleCount = 0;
                projectTiles.forEach(tile => {
                    if (filter === 'all' || tile.dataset.category === filter) {
                        tile.style.display = 'block';
                        visibleCount++;
                    } else {
                        tile.style.display = 'none';
                    }
                });

                if (noProjectsMessage) {
                    if (visibleCount === 0) {
                        noProjectsMessage.style.display = 'block';
                    } else {
                        noProjectsMessage.style.display = 'none';
                    }
                }
            });
        });
    }

    // Minimal animated loading indicator (example: CS initials or dot loader)
    // This is a conceptual placeholder. You'd implement a more specific loader.
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = '<div class="loader-initials">CS</div>'; // Style this with CSS
    // document.body.prepend(loader);

    window.addEventListener('load', () => {
        // setTimeout(() => { // Simulate loading time
        //     loader.style.opacity = '0';
        //     setTimeout(() => loader.remove(), 500);
        // }, 500); // Adjust timing as needed
    });

    // SVG animated logo on load (conceptual)
    // This would require an SVG in your HTML and specific JS/CSS for animation.
    // Example: if you have an SVG with id 'animated-logo'
    // const animatedLogo = document.getElementById('animated-logo');
    // if (animatedLogo) {
    //     // Trigger animation (e.g., by adding a class)
    //     setTimeout(() => animatedLogo.classList.add('animate'), 100);
    // }    // Add class to specific sections that should have scroll animations
    // Only add to sections that already have scroll-animate class or are specifically intended for animation
    const sectionsToAnimate = document.querySelectorAll('main > section.scroll-animate, .hero-area, .featured-projects');
    sectionsToAnimate.forEach(section => {
        if (!section.classList.contains('scroll-animate')) {
            section.classList.add('scroll-animate');
        }
    });
    
    // Ensure contact and other static pages don't get unwanted animations
    const staticSections = document.querySelectorAll('.contact-form-section, .about-section');
    staticSections.forEach(section => {
        section.classList.remove('scroll-animate');
        // Ensure these sections are visible
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    });
    
    animateOnScroll(); // Re-check after adding class

    // Initialize authentication system
    if (typeof ensureAdminUser === 'function') {
        ensureAdminUser();
    }
    if (typeof updateNavigation === 'function') {
        updateNavigation();
    }
    if (typeof setupLoginForm === 'function') {
        setupLoginForm();
    }
    if (typeof setupRegisterForm === 'function') {
        setupRegisterForm();
    }

    // Newsletter Form Handling
    const setupNewsletterForm = () => {
        const newsletterForm = document.getElementById('newsletter-form');
        if (!newsletterForm) return;

        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(newsletterForm);
            const email = formData.get('email').trim();

            // Validate email
            if (!email) {
                showNewsletterFeedback('Please enter your email address.', 'error');
                return;
            }

            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNewsletterFeedback('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate subscription process (you can replace this with actual API call)
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;

            // Store newsletter subscription locally (you can replace this with actual backend integration)
            const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
            
            // Check if email already exists
            if (subscribers.some(sub => sub.email === email)) {
                setTimeout(() => {
                    showNewsletterFeedback('You are already subscribed to our newsletter!', 'error');
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 1000);
                return;
            }

            // Add new subscriber
            subscribers.push({
                email: email,
                subscribedAt: new Date().toISOString(),
                status: 'active'
            });
            localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

            // Show success message
            setTimeout(() => {
                showNewsletterFeedback('Thank you for subscribing! You\'ll receive our latest updates.', 'success');
                newsletterForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1000);
        });
    };

    // Show newsletter feedback
    const showNewsletterFeedback = (message, type = 'success') => {
        const feedbackDiv = document.getElementById('newsletter-feedback');
        const feedbackMessage = document.getElementById('newsletter-message');
        
        if (feedbackDiv && feedbackMessage) {
            feedbackMessage.textContent = message;
            feedbackDiv.className = `form-feedback ${type}`;
            feedbackDiv.style.display = 'block';
            
            // Hide after 5 seconds
            setTimeout(() => {
                feedbackDiv.style.display = 'none';
            }, 5000);
        }
    };

    // Initialize newsletter form
    setupNewsletterForm();

});

// Add to your CSS for the loader example:
/*
#page-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff; 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.5s ease-out;
}
body.dark-mode #page-loader {
    background-color: #111;
}
.loader-initials {
    font-family: 'Your Script Font', cursive; 
    font-size: 3em;
    color: #111;
    animation: pulse 1.5s infinite ease-in-out;
}
body.dark-mode .loader-initials {
    color: #fff;
}
@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.95); }
}
*/

// Add to your CSS for sticky header background change:
/*
header.sticky {
    background-color: rgba(255, 255, 255, 0.95); 
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
body.dark-mode header.sticky {
    background-color: rgba(17, 17, 17, 0.95); 
    box-shadow: 0 2px 10px rgba(255,255,255,0.05);
}
*/
