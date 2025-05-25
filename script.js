// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const loader = document.querySelector('.page-loader');
const mainContent = document.querySelector('main');
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.cursor-dot');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-link, .menu-link');
const themeToggle = document.querySelector('.theme-toggle');

// Project Data
const projects = [
  
    {
        title: 'AI for Ayurveda',
        description: 'A web application combining AI with Ayurvedic principles for personalized health advice via facial image processing and a conversational AI chatbot',
        image: 'a.png',
        tags: ['Python', 'AI', 'Healthcare', 'Web Development'],
        link: 'https://dharmthummar.github.io/ai-ayurveda-assistant'
    },
    {
        title: 'Financial Report Data Extraction',
        description: 'Extracts financial data like Revenue, Operating Profit, and Net Profit from PDFs using Groq API, offering fast and accurate text extraction instead of traditional OCR methods',
        image: 'f.png',
        tags: ['Python', 'Finance', 'Data Extraction'],
        link: 'https://dharmthummar.github.io/financial-report-summarizer-with-LLM'
    },
    {
        title: 'Kaapli - AI Quiz Solver Extension',
        description: 'An AI-powered browser extension providing instant answers to quiz questions, supporting text and image queries, with a focus on educational and ethical use',
        image: 'c.png',
        tags: ['HTML', 'JavaScript', 'AI', 'Education'],
        link: 'https://dharmthummar.github.io/kaapli-extension'
    },
    {
        title: 'Blockchain Media NFT Royalty Distributer',
        description: 'A decentralized Ethereum-based platform for managing digital content, royalties, and NFTs using smart contracts and IPFS, featuring DhaNLak-tokens visualized as QR-like codes',
        image: 'b.png',
        tags: ['Solidity', 'JavaScript', 'Web3', 'Blockchain', 'IPFS'],
        link: 'https://dharmthummar.github.io/Blockchain-Media-NFT-DhaNLak'
    },
    {
        title: 'Ethical Hacking Labs',
        description: 'Offers hands-on tutorials and practical assignments for learning ethical hacking, covering lab setup, network scanning, and SQL injection',
        image: 'e.png',
        tags: ['HTML', 'Security', 'Education'],
        link: 'https://dharmthummar.github.io/ethical-hacking-labs'
    }

];

// Achievement Data
const achievements = [
    {
        title: 'MINeD Hackathon 2025',
        description: 'Developed AI-based financial data extraction tools (January 30- February 1, 2025)',
        icon: 'mined25.webp',
        link: 'https://certificate.givemycertificate.com/c/28a8e224-cfd9-4847-8b95-b3e3bb06db23'
    },
    {
        title: 'AWS Cloud Developing',
        description: 'Achieved AWS Cloud Developing Certification showcasing advanced cloud development skills (April 2, 2025)',
        icon: 'awsd.webp',
        link: 'https://www.credly.com/badges/cbec63e8-5a27-4bdd-8fb5-8e448e09fc53/public_url'
    },
   
    {
        title: 'Smart India Hackathon 2023',
        description: 'Advanced to local rounds with innovative tech solution (August 22, 2023)',
        icon: 'sih.webp',
        link: 'https://drive.google.com/file/d/18amqfih6dGpLzzISL0Sx2RUo25WvqHEC/view?usp=sharing'
    },
    {
        title: 'AWS Cloud Foundations',
        description: 'Earned AWS Cloud Foundations Certification demonstrating proficiency in cloud computing fundamentals (April 1, 2025)',
        icon: 'awsf.webp',
        link: 'https://www.credly.com/badges/88a9ce83-5c88-4e47-990e-88527a7d4aae/public_url'
    },
    {
        title: 'Community Service Internship',
        description: 'Led social welfare projects, developing leadership and collaborative skills',
        icon: 'community.webp',
        link: '#'
    }
];

// Custom Cursor
let cursorX = 0;
let cursorY = 0;
let raf;

const updateCursor = (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    if (!raf) {
        raf = requestAnimationFrame(updateCursorPosition);
    }
};

const updateCursorPosition = () => {
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    raf = null;
};

const cursorHover = () => {
    cursor.classList.add('hover');
    cursorDot.classList.add('hover');
};

const cursorUnhover = () => {
    cursor.classList.remove('hover');
    cursorDot.classList.remove('hover');
};

// Theme Toggle
const toggleTheme = () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    document.documentElement.setAttribute('data-theme', isLight ? '' : 'light');
    localStorage.setItem('theme', isLight ? '' : 'light');
    updateThemeIcon();
};

const updateThemeIcon = () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const icon = themeToggle.querySelector('i');
    icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
};

// Mobile Menu Toggle
const toggleMenu = () => {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
};

// Populate Projects
// Apple Watch-style Project Grid
function renderAppleWatchGrid() {
    const workGrid = document.querySelector('.apple-watch-grid');
    if (!workGrid) return;
    workGrid.innerHTML = '';
    const centerX = workGrid.offsetWidth / 2;
    const centerY = workGrid.offsetHeight / 2;
    const minRadius = 120;
    const maxRadius = 220;
    const angleStep = (2 * Math.PI) / projects.length;
    const usedPositions = [];
    projects.forEach((project, i) => {
        const angle = i * angleStep + Math.random() * 0.2;
        const radius = minRadius + Math.random() * (maxRadius - minRadius);
        const size = 80 + Math.random() * 60;
        const x = centerX + Math.cos(angle) * radius - size / 2;
        const y = centerY + Math.sin(angle) * radius - size / 2;
        const bubble = document.createElement('div');
        bubble.className = 'project-bubble';
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        bubble.innerHTML = `
            <img src="assets/projects/${project.image}" alt="${project.title}" class="bubble-img">
            <span class="bubble-title">${project.title}</span>
        `;
        bubble.addEventListener('mouseenter', () => {
            bubble.style.zIndex = 10;
        });
        bubble.addEventListener('mouseleave', () => {
            bubble.style.zIndex = 2;
        });
        bubble.addEventListener('click', () => showProjectPopup(project));
        workGrid.appendChild(bubble);
    });
}

function showProjectPopup(project) {
    let popup = document.querySelector('.project-popup');
    if (!popup) {
        popup = document.createElement('div');
        popup.className = 'project-popup';
        document.body.appendChild(popup);
    }
    popup.innerHTML = `
        <button class="popup-close" aria-label="Close">&times;</button>
        <img src="assets/projects/${project.image}" alt="${project.title}" class="popup-img">
        <div class="popup-title">${project.title}</div>
        <div class="popup-desc">${project.description}</div>
        <div class="popup-tags">
            ${project.tags.map(tag => `<span class="popup-tag">${tag}</span>`).join('')}
        </div>
        <a href="${project.link}" class="popup-link" target="_blank">Visit Website</a>
    `;
    popup.classList.add('active');

    // Close popup on close button
    popup.querySelector('.popup-close').onclick = () => closeProjectPopup();

    // Close popup on Escape key
    const escListener = (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closeProjectPopup();
        }
    };
    document.addEventListener('keydown', escListener);

    // Close popup when clicking outside
    const outsideClickListener = (e) => {
        if (popup.classList.contains('active') && !popup.contains(e.target)) {
            closeProjectPopup();
        }
    };
    setTimeout(() => {
        // Timeout to avoid immediate close on open
        document.addEventListener('mousedown', outsideClickListener);
    }, 0);

    // Store listeners for removal
    popup._escListener = escListener;
    popup._outsideClickListener = outsideClickListener;
}

function closeProjectPopup() {
    const popup = document.querySelector('.project-popup');
    if (popup) {
        popup.classList.remove('active');
        // Remove listeners
        if (popup._escListener) {
            document.removeEventListener('keydown', popup._escListener);
            popup._escListener = null;
        }
        if (popup._outsideClickListener) {
            document.removeEventListener('mousedown', popup._outsideClickListener);
            popup._outsideClickListener = null;
        }
    }
}

function addFloatingObjects() {
    const main = document.querySelector('main');
    if (!main) return;
    ['obj1','obj2','obj3'].forEach(cls => {
        const obj = document.createElement('div');
        obj.className = `floating-obj ${cls}`;
        main.appendChild(obj);
    });
}

// Replace populateProjects with Apple Watch grid
function populateProjects() {
    renderAppleWatchGrid();
}

// Populate Achievements
const populateAchievements = () => {
    const achievementsGrid = document.querySelector('.achievements-grid');
    achievementsGrid.innerHTML = achievements.map((achievement, index) => `
        <div class="achievement-card ${index >= 4 ? 'hidden-achievement' : ''}" style="animation-delay: ${index * 0.2}s">
            <img src="assets/achievements/${achievement.icon}" alt="${achievement.title}" class="achievement-icon">
            <div class="achievement-content">
                <h3 class="achievement-title">${achievement.title}</h3>
                <p class="achievement-description">${achievement.description}</p>
                <a href="${achievement.link}" class="achievement-link">
                    Link <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `).join('');

    // Add show more button if there are more than 4 achievements
    const showMoreContainer = document.querySelector('.show-more-container');
    if (achievements.length > 4) {
        showMoreContainer.innerHTML = `
            <button class="show-more-btn">
                Show More <i class="fas fa-chevron-down"></i>
            </button>
        `;
        
        // Add show more functionality
        const showMoreBtn = document.querySelector('.show-more-btn');
        showMoreBtn.addEventListener('click', toggleAchievements);
    } else {
        showMoreContainer.style.display = 'none';
    }
};

// Toggle Achievements
const toggleAchievements = () => {
    const hiddenAchievements = document.querySelectorAll('.hidden-achievement');
    const showMoreBtn = document.querySelector('.show-more-btn');
    const isExpanded = showMoreBtn.classList.contains('expanded');

    hiddenAchievements.forEach((achievement, index) => {
        if (!isExpanded) {
            achievement.style.display = 'flex';
            setTimeout(() => {
                achievement.classList.add('animate');
            }, index * 200);
        } else {
            achievement.classList.remove('animate');
            setTimeout(() => {
                achievement.style.display = 'none';
            }, 300);
        }
    });

    showMoreBtn.classList.toggle('expanded');
    showMoreBtn.innerHTML = isExpanded ? 
        'Show More <i class="fas fa-chevron-down"></i>' : 
        'Show Less <i class="fas fa-chevron-up"></i>';
};

// Intersection Observer for animations
const observeAchievements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    // Observe achievement cards
    document.querySelectorAll('.achievement-card:not(.hidden-achievement)').forEach(card => {
        observer.observe(card);
    });

    // Observe show more button
    const showMoreContainer = document.querySelector('.show-more-container');
    if (showMoreContainer) {
        observer.observe(showMoreContainer);
    }
};

// GSAP Animations
const initAnimations = () => {
    // Hero Section Animation
    gsap.from('.hero-text h1', {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'power4.out',
        delay: 0.5
    });

    gsap.from('.hero-text p', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power4.out',
        delay: 0.8
    });

    gsap.from('.hero-cta', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power4.out',
        delay: 1
    });

    // About Section Animation
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: -100,
        opacity: 0,
        ease: 'power4.out'
    });

    gsap.from('.skills-orbit', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: 100,
        opacity: 0,
        ease: 'power4.out'
    });

    // Project Cards Animation
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.work-section',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power4.out'
    });

    // Achievement Timeline Animation
    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.achievements-section',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: -100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power4.out'
    });

    // Contact Section Animation
    gsap.from('.contact-info, .contact-form', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power4.out'
    });
};

// Progress Bar
const progressBar = document.querySelector('.progress-bar');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Show loader
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.classList.remove('loading');
        }, 500);
    }, 1500);

    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    updateThemeIcon();

    // Populate content
    populateProjects();
    populateAchievements();
    observeAchievements();

    // Initialize animations
    initAnimations();

    // Throttled mousemove event
    document.addEventListener('mousemove', updateCursor, { passive: true });

    // Optimize hover elements selection and event binding
    const hoverElements = document.querySelectorAll('a, button, .project-bubble, .achievement-card, input, textarea');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', cursorHover);
        element.addEventListener('mouseleave', cursorUnhover);
    });

    themeToggle.addEventListener('click', toggleTheme);
    menuToggle.addEventListener('click', toggleMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Form submission
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        console.log('Form submitted:', formData);
        e.target.reset();
    });
    addFloatingObjects();
});