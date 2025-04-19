// Add this at the top of script.js
const GROQ_API_KEY = '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'; // ⚠️ Replace with your actual API key

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Chat functionality
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const sendButton = document.getElementById('sendButton');

    // Handle sending messages
    async function handleMessage(message) {
        if (!message.trim()) return;

        addMessage(message, 'user');
        chatInput.value = '';
        addMessage("...", 'bot'); // Add a temporary thinking indicator
        const thinkingMessageElement = chatMessages.lastElementChild.querySelector('.message-content p');

        try {
            const payload = {
                model: "llama3-70b-8192",// Or try "llama3-8b-8192"
                messages: [{ role: "user", content: message }],
                temperature: 0.7,
            };

            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${GROQ_API_KEY}` // Ensure this key is correct
                },
                body: JSON.stringify(payload)
            });

            // Check if the response was successful (status code 2xx)
            if (!response.ok) {
                // Try to get more specific error details from the response body
                let errorDetails = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorDetails += ` - ${errorData.error?.message || JSON.stringify(errorData)}`;
                } catch (jsonError) {
                    // If the response body isn't JSON, use the status text
                    errorDetails += ` - ${response.statusText}`;
                }
                console.error("API Error:", errorDetails);
                // Update the thinking message with the error
                thinkingMessageElement.textContent = `Sorry, I encountered an error: ${response.status}. Please check the console for details.`;
                chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll down
                return; // Stop execution here
            }

            const data = await response.json();

            // Check if choices exist before accessing
            if (data.choices && data.choices.length > 0 && data.choices[0].message) {
                const reply = data.choices[0].message.content;
                 // Update the thinking message with the actual reply
                thinkingMessageElement.textContent = reply;
            } else {
                console.error("API Error: Invalid response structure", data);
                // Update the thinking message with an error
                thinkingMessageElement.textContent = "Sorry, I received an unexpected response from the AI.";
            }

        } catch (err) {
            console.error("Fetch Error:", err);
             // Update the thinking message with the error
            thinkingMessageElement.textContent = "Sorry, I encountered a network or script error. Please try again.";
        }

        // Auto-scroll to bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send button click handler
    sendButton.addEventListener('click', () => {
        handleMessage(chatInput.value);
    });

    // Enter key handler
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleMessage(chatInput.value);
        }
    });

    // Function to add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        
        contentDiv.appendChild(paragraph);
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
    }

    // Example buttons functionality
    document.querySelectorAll('.example-button').forEach(button => {
        button.addEventListener('click', () => {
            handleMessage(button.textContent);
        });
    });
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