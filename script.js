// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    // Create mobile menu button if it doesn't exist
    if (!mobileMenuBtn) {
        const menuBtn = document.createElement('div');
        menuBtn.className = 'mobile-menu';
        menuBtn.innerHTML = '☰';
        document.querySelector('nav').appendChild(menuBtn);
    }

    // Toggle mobile menu
    document.querySelector('.mobile-menu').addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav')) {
            navMenu.classList.remove('active');
            document.querySelector('.mobile-menu').innerHTML = '☰';
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('href').substring(1);
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth'
            });
        }
        // Close mobile menu after clicking a link
        document.querySelector('nav ul').classList.remove('active');
        document.querySelector('.mobile-menu').innerHTML = '☰';
    });
});

// Newsletter subscription
document.querySelector('.newsletter button').addEventListener('click', function() {
    const emailInput = document.querySelector('.newsletter input[type="email"]');
    const email = emailInput.value.trim();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        alert('Please enter your email address.');
        return;
    }
    
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Here you would typically send this to a server
    // For demo purposes, we'll just show a success message
    alert('Thank you for subscribing! You will receive our newsletter soon.');
    emailInput.value = '';
});

// Add animation to feature cards on scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animations to feature cards
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-in-out';
    observer.observe(card);
});

// Add hover effects to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add lazy loading to images
document.querySelectorAll('img').forEach(img => {
    img.setAttribute('loading', 'lazy');
});

// Lightbox Feature for Images
document.addEventListener('DOMContentLoaded', function() {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <img id="lightbox-img" src="" alt="Lightbox image">
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Add necessary styles
    const style = document.createElement('style');
    style.textContent = `
        #lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }

        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }

        #lightbox-img {
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
            border: 3px solid white;
            border-radius: 5px;
        }

        .close-lightbox {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 35px;
            cursor: pointer;
            transition: color 0.3s ease;
        }

        .close-lightbox:hover {
            color: #ccc;
        }

        .lightbox-caption {
            color: white;
            text-align: center;
            padding: 10px;
            font-size: 18px;
            margin-top: 10px;
        }
    `;
    document.head.appendChild(style);

    // Add click handlers to all mentor images
    const mentorImages = document.querySelectorAll('.mentor-cards .card img');
    mentorImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const lightboxImg = document.getElementById('lightbox-img');
            const caption = document.querySelector('.lightbox-caption');
            
            // Get mentor name and title
            const mentorName = this.parentElement.querySelector('h3').textContent;
            const mentorTitle = this.parentElement.querySelector('p').textContent;
            
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            caption.textContent = `${mentorName} - ${mentorTitle}`;
            
            lightbox.style.display = 'flex';
            
            // Add fade-in animation
            lightbox.style.opacity = '0';
            lightbox.style.transition = 'opacity 0.3s ease';
            setTimeout(() => lightbox.style.opacity = '1', 10);
        });
    });

    // Close lightbox when clicking close button or outside the image
    const closeBtn = document.querySelector('.close-lightbox');
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => lightbox.style.display = 'none', 300);
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            const currentImg = document.getElementById('lightbox-img');
            const allImages = Array.from(mentorImages);
            const currentIndex = allImages.findIndex(img => img.src === currentImg.src);

            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                showImage(currentIndex - 1);
            } else if (e.key === 'ArrowRight' && currentIndex < allImages.length - 1) {
                showImage(currentIndex + 1);
            }
        }
    });

    function showImage(index) {
        const images = Array.from(mentorImages);
        const img = images[index];
        const lightboxImg = document.getElementById('lightbox-img');
        const caption = document.querySelector('.lightbox-caption');
        
        const mentorName = img.parentElement.querySelector('h3').textContent;
        const mentorTitle = img.parentElement.querySelector('p').textContent;
        
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        caption.textContent = `${mentorName} - ${mentorTitle}`;
    }
});