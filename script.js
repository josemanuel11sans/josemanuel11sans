// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(function() {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.addEventListener('mousedown', function() {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
});

document.addEventListener('mouseup', function() {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Add hover effect to links and buttons
const links = document.querySelectorAll('a, button, .project-card, .skill-card, .contact-card');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
        cursorFollower.style.backgroundColor = 'rgba(255, 60, 172, 0.2)';
    });
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.backgroundColor = 'rgba(120, 75, 160, 0.3)';
    });
});

// Hide cursor on mobile devices
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
}

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Skills Tab
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        tabBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding tab pane
        const target = btn.getAttribute('data-target');
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
            if (pane.id === target) {
                pane.classList.add('active');
            }
        });
    });
});

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animate skill bars on scroll
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress;
    });
}

// Animate elements on scroll
const animateElements = document.querySelectorAll('.skill-card, .project-card, .contact-card, .stat-item');

function checkScroll() {
    const triggerBottom = window.innerHeight * 0.8;
    
    animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
    
    // Check if skills section is in view
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillsSectionTop = skillsSection.getBoundingClientRect().top;
        if (skillsSectionTop < triggerBottom) {
            animateSkillBars();
        }
    }
}

// Set initial state for animated elements
animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'all 0.6s ease';
});

// Check scroll on page load
window.addEventListener('load', checkScroll);

// Check scroll on scroll event
window.addEventListener('scroll', checkScroll);

// Form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Form submission is handled by formspree
        console.log('Form submitted');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Typing animation for hero section
const typingElement = document.querySelector('.hero-text h2 .gradient-text');
if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
}

// Gallery Modal
const galleryModal = document.getElementById('galleryModal');
const projectBtns = document.querySelectorAll('.project-btn');
const closeModal = document.querySelector('.close-modal');
const galleryTabs = document.querySelectorAll('.gallery-tab');
const galleryTabContents = document.querySelectorAll('.gallery-tab-content');
const galleryGrid = document.querySelector('.gallery-grid');
const videoContainer = document.querySelector('.video-container');

// Project gallery data
const projectGalleries = {
    assettracker: {
        images: [
            'https://res.cloudinary.com/dic186agm/image/upload/v1747112750/Login_oegfxd.png',
            'https://res.cloudinary.com/dic186agm/image/upload/v1747190733/WhatsApp_Image_2025-05-13_at_8.43.15_PM_j6schg.jpg',
            'https://res.cloudinary.com/dic186agm/image/upload/v1747190733/WhatsApp_Image_2025-05-13_at_8.43.43_PM_r2upiu.jpg',
            //'https://res.cloudinary.com/dic186agm/image/upload/v1743836381/una33gtasapz3fj4wnwf.png'
        ],
        videos: [
            'https://res.cloudinary.com/dic186agm/video/upload/v1747190734/WhatsApp_Video_2025-05-13_at_8.43.42_PM_zomdf5.mp4',
            'https://res.cloudinary.com/dic186agm/video/upload/v1747429929/Grabaci%C3%B3n_de_pantalla_2025-03-10_213924_hekdwy.mp4'
        ]
    },
    triks: {
        images: [
            'https://res.cloudinary.com/dic186agm/image/upload/v1747190733/WhatsApp_Image_2025-05-13_at_8.44.28_PM_xintlx.jpg',
            'https://res.cloudinary.com/dic186agm/image/upload/v1747190733/WhatsApp_Image_2025-05-13_at_8.44.28_PM_1_y9vmuy.jpg',
            'https://res.cloudinary.com/dic186agm/image/upload/v1743836326/oh9yw5b4akoyopb39rqw.png',
            'https://res.cloudinary.com/dic186agm/image/upload/v1747430140/WhatsApp_Image_2025-05-12_at_10.14.39_PM_wo6xou.jpg'
        ],
        videos: [
            // 'https://res.cloudinary.com/dic186agm/video/upload/v1747190733/demo-triks.mp4'
        ]
    },
    knn: {
        images: [
            'https://res.cloudinary.com/dic186agm/image/upload/v1747191409/creaturas_fjhrpq.png',
            // '',
            // 'https://res.cloudinary.com/dic186agm/image/upload/v1747191409/creaturas3_fjhrpq.png'
        ],
        videos: [
            // 'https://res.cloudinary.com/dic186agm/video/upload/v1747191409/demo-knn.mp4'
        ]
    },
    propmanager: {
        images: [
            'https://res.cloudinary.com/dic186agm/image/upload/v1747192141/porp_1_enodye.png',
            'https://res.cloudinary.com/dic186agm/image/upload/v1747192141/porp_2_enodye.png',
            'https://res.cloudinary.com/dic186agm/image/upload/v1747192141/porp_3_enodye.png'
        ],
        videos: [
            'https://res.cloudinary.com/dic186agm/video/upload/v1747430575/Grabaci%C3%B3n_de_pantalla_2025-03-31_214122_rhrsyp.mp4'
        ]
    },
    carmanager: {
        images: [
            'https://res.cloudinary.com/dic186agm/image/upload/v1747192985/car_2_neoikc.png',
            'https://res.cloudinary.com/dic186agm/image/upload/v1747192945/WhatsApp_Image_2025-05-13_at_8.44.28_PM_2_ushdze.jpg',
            'https://res.cloudinary.com/dic186agm/image/upload/v1747192891/lonig_carros_mtw5mg.png'
        ],
        videos: [
            // '    https://res.cloudinary.com/dic186agm/video/upload/v1747192985/demo-carmanager.mp4'
        ]
    }
};

// Current project and gallery state
let currentProject = '';
let currentImageIndex = 0;
let currentVideoIndex = 0;

// Open gallery modal
projectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        currentProject = btn.getAttribute('data-project');
        
        if (projectGalleries[currentProject]) {
            openGallery(currentProject);
        }
    });
});

// Close gallery modal
closeModal.addEventListener('click', () => {
    galleryModal.classList.remove('active');
    setTimeout(() => {
        galleryModal.style.display = 'none';
    }, 300);
});

// Close modal when clicking outside content
galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        closeModal.click();
    }
});

// Switch gallery tabs
galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        galleryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const tabTarget = tab.getAttribute('data-tab');
        galleryTabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tabTarget) {
                content.classList.add('active');
            }
        });
    });
});

// Open gallery with project content
function openGallery(projectId) {
    const project = projectGalleries[projectId];
    
    if (!project) return;
    
    // Reset indices
    currentImageIndex = 0;
    currentVideoIndex = 0;
    
    // Load images
    galleryGrid.innerHTML = '';
    project.images.forEach((img, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `<img src="${img}" alt="Project Image ${index + 1}">`;
        galleryGrid.appendChild(galleryItem);
    });
    
    // Load first video
    loadVideo(project.videos[0]);
    
    // Show modal
    galleryModal.style.display = 'block';
    setTimeout(() => {
        galleryModal.classList.add('active');
    }, 10);
    
    // Set first tab as active
    galleryTabs[0].click();
    
    // Setup navigation
    setupGalleryNavigation(project);
}

// Load video into container
function loadVideo(videoUrl) {
    if (!videoUrl) {
        videoContainer.innerHTML = '<p style="color: white;">No video available</p>';
        return;
    }
    
    videoContainer.innerHTML = `
        <video controls>
            <source src="${videoUrl}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;
}

// Setup gallery navigation
function setupGalleryNavigation(project) {
    const prevBtns = document.querySelectorAll('.gallery-nav-btn.prev');
    const nextBtns = document.querySelectorAll('.gallery-nav-btn.next');
    
    // Images navigation
    prevBtns[0].addEventListener('click', () => {
        if (project.images.length <= 1) return;
        
        currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
        updateGalleryView('images', project);
    });
    
    nextBtns[0].addEventListener('click', () => {
        if (project.images.length <= 1) return;
        
        currentImageIndex = (currentImageIndex + 1) % project.images.length;
        updateGalleryView('images', project);
    });
    
    // Videos navigation
    prevBtns[1].addEventListener('click', () => {
        if (project.videos.length <= 1) return;
        
        currentVideoIndex = (currentVideoIndex - 1 + project.videos.length) % project.videos.length;
        updateGalleryView('videos', project);
    });
    
    nextBtns[1].addEventListener('click', () => {
        if (project.videos.length <= 1) return;
        
        currentVideoIndex = (currentVideoIndex + 1) % project.videos.length;
        updateGalleryView('videos', project);
    });
}

// Update gallery view based on current indices
function updateGalleryView(type, project) {
    if (type === 'images') {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            if (index === currentImageIndex) {
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    } else if (type === 'videos') {
        loadVideo(project.videos[currentVideoIndex]);
    }
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal.click();
    }
});