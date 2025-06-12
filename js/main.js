document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        // Update toggle icon if you have one, e.g., show moon for dark, sun for light
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            let theme = 'light-mode';
            if (document.body.classList.contains('dark-mode')) {
                theme = 'dark-mode';
            }
            localStorage.setItem('theme', theme);
            // Update toggle icon here as well
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

    if (filterButtons.length > 0 && projectTiles.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Active button state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.dataset.filter;

                projectTiles.forEach(tile => {
                    if (filter === 'all' || tile.dataset.category === filter) {
                        tile.style.display = 'block'; // Or your preferred display type
                    } else {
                        tile.style.display = 'none';
                    }
                });
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
    // }

    // Add class to body sections for scroll animations
    const sectionsToAnimate = document.querySelectorAll('main > section');
    sectionsToAnimate.forEach(section => {
        section.classList.add('scroll-animate');
    });
    animateOnScroll(); // Re-check after adding class

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
