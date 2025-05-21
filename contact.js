document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Close all other items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to your server
            console.log('Form submitted:', { name, email, phone, subject, message });
            
            // Show success message (in a real app, do this after successful AJAX call)
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Initialize map (placeholder - would use Google Maps or Leaflet in a real project)
    const mapElement = document.getElementById('map');
    
    if (mapElement) {
        // This is a placeholder. In a real application, you would initialize a map here
        mapElement.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100%; background-color: #e1e1e1;">
                <p style="text-align: center; padding: 20px;">
                    Map placeholder. In a real application, a Google Maps or Leaflet map would be displayed here.<br>
                    <span style="font-size: 0.9rem; color: #666;">Location: 123 Brotherhood Road, San Francisco, CA 94110</span>
                </p>
            </div>
        `;
    }
});

