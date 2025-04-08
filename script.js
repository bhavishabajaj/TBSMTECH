// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Chat functionality
document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const chatboard = document.getElementById('chatboard');
    
    // Initialize chat with a welcome message
    addMessage('Welcome to Groq! How can I help you today?', 'bot');
    
    // Handle chat form submission
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const message = chatInput.value.trim();
            if (message) {
                // Add user message to chat
                addMessage(message, 'user');
                chatInput.value = '';
                
                // Simulate bot typing
                chatboard.classList.add('typing');
                
                // Simulate response delay
                setTimeout(() => {
                    chatboard.classList.remove('typing');
                    
                    // Simulate bot response
                    const responses = [
                        "Thank you for your message! Our AI is processing your request.",
                        "Great question! Groq's inference engine can help with that.",
                        "I understand. Let me connect you with our ultra-fast AI system.",
                        "Thanks for reaching out! Groq's LLM can provide detailed information on this topic."
                    ];
                    
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    addMessage(randomResponse, 'bot');
                    
                    // Auto-scroll to bottom of chat
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
                
                // Auto-scroll to bottom of chat
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        });
    }
    
    // Function to add message to chat
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        messageElement.innerHTML = `
            <div class="message-bubble">
                ${text}
            </div>
        `;
        chatMessages.appendChild(messageElement);
    }
    
    // Toggle chat visibility
    const chatToggleBtn = document.getElementById('chatToggleBtn');
    if (chatToggleBtn) {
        chatToggleBtn.addEventListener('click', () => {
            chatboard.classList.toggle('expanded');
            if (chatboard.classList.contains('expanded')) {
                chatInput.focus();
            }
        });
    }
});

// Animated background effect
function createParticles() {
    const bgAnimation = document.getElementById('bgAnimation');
    if (!bgAnimation) return;
    
    const particlesCount = 50;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 1 and 3px
        const size = Math.random() * 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5;
        
        bgAnimation.appendChild(particle);
        
        animateParticle(particle);
    }
}

function animateParticle(particle) {
    const duration = Math.random() * 3000 + 2000;
    
    const animation = particle.animate(
        [
            { 
                transform: 'translate(0, 0)', 
                opacity: particle.style.opacity 
            },
            { 
                transform: `translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px)`, 
                opacity: 0 
            }
        ],
        {
            duration: duration,
            easing: 'ease-out',
            iterations: Infinity,
            direction: 'alternate'
        }
    );
}

// Initialize particles
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

// Apply the observer to elements that should animate on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to features and section titles
    document.querySelectorAll('.feature-card, .section-title').forEach(element => {
        element.classList.add('animate-in');
        observer.observe(element);
    });
});

// Add a window resize event listener to handle responsive behavior
window.addEventListener('resize', () => {
    // Reset mobile menu when window width changes
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Chat typing effect
document.addEventListener('DOMContentLoaded', () => {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        setInterval(() => {
            typingIndicator.classList.toggle('pulse');
        }, 500);
    }
});

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('groq-theme', currentTheme);
        });
        
        // Apply saved theme preference
        const savedTheme = localStorage.getItem('groq-theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }
});