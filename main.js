import VanillaTilt from 'vanilla-tilt';
import { config } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize tilt effect on event card
    const tiltElement = document.querySelector('.event-card');
    if (tiltElement) {
        VanillaTilt.init(tiltElement, {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');

    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', () => {
            mainMenu.classList.toggle('active');
        });
    }

    // Contact modal
    const contactLinks = document.querySelectorAll('a[href="#contact"]');
    const modal = document.getElementById('contact');
    const closeModal = document.querySelector('.close-modal');

    contactLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            console.log('Form submitted:', formValues);
            
            // Simulated submission success
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    
    const showTestimonial = (index) => {
        testimonials.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    };
    
    if (dots.length > 0) {
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                showTestimonial(index);
            });
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
    }

    // Auto slider for testimonials
    let testimonialInterval;
    
    const startTestimonialInterval = () => {
        testimonialInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, config.testimonialInterval);
    };
    
    if (testimonials.length > 0) {
        startTestimonialInterval();
        
        // Pause auto-sliding when user interacts with slider
        const sliderControls = document.querySelector('.slider-controls');
        if (sliderControls) {
            sliderControls.addEventListener('mouseenter', () => {
                clearInterval(testimonialInterval);
            });
            
            sliderControls.addEventListener('mouseleave', () => {
                startTestimonialInterval();
            });
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#contact') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mainMenu && mainMenu.classList.contains('active')) {
                    mainMenu.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Apply dynamic content from config
    if (config.organizationName) {
        document.querySelectorAll('.org-name').forEach(el => {
            el.textContent = config.organizationName;
        });
    }

    // Apply theme colors
    document.documentElement.style.setProperty('--orange', config.colors.primary);
    document.documentElement.style.setProperty('--dark-orange', config.colors.primaryDark);
    document.documentElement.style.setProperty('--black', config.colors.secondary);
});

