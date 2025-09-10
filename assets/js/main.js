// RevSnap JavaScript - Interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initModals();
    initForms();
    initAnimations();
    initFloatingCTAs();
    
    console.log('RevSnap website loaded successfully');
});

// Navigation functionality
function initNavigation() {
    const nav = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    // Sticky navigation on scroll
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.transform = currentScrollY > lastScrollY ? 'translateY(-100%)' : 'translateY(0)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    mobileMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    mobileMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
}

// Modal functionality
function initModals() {
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Focus first input in the modal
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    }
}

// FAQ functionality
function toggleFaq(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Form functionality
function initForms() {
    // Real-time form validation
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    clearFieldError(e);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // URL validation
    if (field.type === 'url' && value) {
        try {
            new URL(value);
        } catch {
            isValid = false;
            errorMessage = 'Please enter a valid URL';
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#EF4444';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
}

// Form submission
async function submitForm(e, type) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        if (data[key]) {
            // Handle multiple values (like checkboxes)
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }
    
    // Validate all fields
    const fields = form.querySelectorAll('input, select, textarea');
    let isFormValid = true;
    
    fields.forEach(field => {
        const fieldValid = validateField({ target: field });
        if (!fieldValid) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    
    try {
        // Attempt API submission
        const response = await fetch('/api/lead', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type, ...data })
        });
        
        if (response.ok) {
            showSuccess(type);
            form.reset();
            closeModal(form.closest('.modal')?.id);
        } else {
            throw new Error('API submission failed');
        }
    } catch (error) {
        console.log('API submission failed, trying mailto fallback');
        
        // Fallback to mailto
        const subject = encodeURIComponent(`RevSnap ${type} Request - ${data.company || 'New Lead'}`);
        const body = encodeURIComponent(`
New ${type} request from RevSnap website:

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Company: ${data.company || 'Not provided'}
Website: ${data.website || 'Not provided'}
Phone: ${data.phone || 'Not provided'}
Monthly Revenue: ${data.revenue || 'Not provided'}
Use Case: ${data.useCase || 'Not provided'}
${data.integrations ? `Integrations: ${Array.isArray(data.integrations) ? data.integrations.join(', ') : data.integrations}` : ''}
${data.estimates ? `Estimates: ${data.estimates}` : ''}
${data.startDate ? `Preferred Start Date: ${data.startDate}` : ''}

Consent: ${data.consent ? 'Yes' : 'No'}

Submitted: ${new Date().toISOString()}
        `);
        
        window.location.href = `mailto:leads@revsnap.ai?subject=${subject}&body=${body}`;
        
        showSuccess(type);
        form.reset();
        closeModal(form.closest('.modal')?.id);
    } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
    }
}

function showSuccess(type) {
    const messages = {
        demo: "Thanks! Your demo is booked. We've emailed details and a calendar invite.",
        pilot: "You're on the list—our team will activate your pilot within 48 hours.",
        contact: "Thank you for your message. We'll get back to you within 24 hours."
    };
    
    const successModal = document.getElementById('success-modal');
    const successMessage = document.getElementById('success-message');
    
    if (successModal && successMessage) {
        successMessage.textContent = messages[type] || messages.contact;
        openModal('success-modal');
    } else {
        alert(messages[type] || messages.contact);
    }
}

// Animation functionality
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.step, .metric-card, .pricing-card, .security-item, .problem-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Floating CTAs functionality
function initFloatingCTAs() {
    const floatingCTAs = document.querySelector('.floating-ctas');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Show/hide floating CTAs based on scroll direction
        if (currentScrollY > 500) {
            floatingCTAs.style.opacity = '1';
            floatingCTAs.style.visibility = 'visible';
            
            if (currentScrollY > lastScrollY) {
                // Scrolling down - hide CTAs
                floatingCTAs.style.transform = 'translateY(100px)';
            } else {
                // Scrolling up - show CTAs
                floatingCTAs.style.transform = 'translateY(0)';
            }
        } else {
            floatingCTAs.style.opacity = '0';
            floatingCTAs.style.visibility = 'hidden';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Chat functionality
function openChat() {
    // Placeholder for chat integration
    alert('Chat integration pending. Please use the contact form or book a demo instead.');
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Analytics helpers
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log('Track Event:', eventName, properties);
    
    // Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, properties);
    }
}

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            
            console.log(`Page load time: ${loadTime}ms`);
            trackEvent('page_load_time', { load_time: loadTime });
        });
    }
}

// Error handling
window.addEventListener('error', (event) => {
    console.error('JavaScript error:', event.error);
    trackEvent('javascript_error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno
    });
});

// Initialize performance monitoring
measurePerformance();

// Service worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal(activeModal.id);
        }
        
        if (document.querySelector('.mobile-menu.active')) {
            closeMobileMenu();
        }
    }
    
    // Navigate with arrow keys in FAQ
    if (e.target.classList.contains('faq-question')) {
        const faqItems = Array.from(document.querySelectorAll('.faq-question'));
        const currentIndex = faqItems.indexOf(e.target);
        
        if (e.key === 'ArrowDown' && currentIndex < faqItems.length - 1) {
            e.preventDefault();
            faqItems[currentIndex + 1].focus();
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            faqItems[currentIndex - 1].focus();
        }
    }
});

// Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
initLazyLoading();

// Form analytics
document.addEventListener('submit', (e) => {
    const form = e.target;
    const formType = form.id.replace('-form', '');
    
    trackEvent('form_submit', {
        form_type: formType,
        form_id: form.id
    });
});

// CTA click tracking
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        const buttonText = e.target.textContent.trim();
        const buttonType = e.target.classList.contains('btn-primary') ? 'primary' : 'secondary';
        
        trackEvent('button_click', {
            button_text: buttonText,
            button_type: buttonType,
            page_section: e.target.closest('section')?.className || 'unknown'
        });
    }
});

// Scroll depth tracking
let maxScrollDepth = 0;
const scrollDepthThresholds = [25, 50, 75, 90, 100];

window.addEventListener('scroll', throttle(() => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = Math.round((scrollTop / (docHeight - winHeight)) * 100);
    
    if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        
        scrollDepthThresholds.forEach(threshold => {
            if (scrollPercent >= threshold && maxScrollDepth >= threshold) {
                trackEvent('scroll_depth', {
                    depth_percentage: threshold,
                    page_url: window.location.href
                });
            }
        });
    }
}, 250));

// Time on page tracking
let timeOnPage = 0;
const timeInterval = setInterval(() => {
    timeOnPage += 10;
    
    // Track major time milestones
    if ([30, 60, 120, 300].includes(timeOnPage)) {
        trackEvent('time_on_page', {
            seconds: timeOnPage,
            page_url: window.location.href
        });
    }
}, 10000); // Every 10 seconds

// Clean up interval on page unload
window.addEventListener('beforeunload', () => {
    clearInterval(timeInterval);
    
    trackEvent('page_exit', {
        time_on_page: timeOnPage,
        max_scroll_depth: maxScrollDepth
    });
});