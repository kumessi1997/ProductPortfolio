// Load Rive Animation
const r = new rive.Rive({
    src: "product_platform.riv",
    canvas: document.getElementById("riveCanvas"),
    autoplay: true,
    stateMachines: "State Machine 1",
    artboard: "Main2",
    onLoad: () => {
        r.resizeDrawingSurfaceToCanvas();
    },
});

// Adjust canvas size on window resize for full responsiveness
window.addEventListener('resize', () => {
    r.resizeDrawingSurfaceToCanvas();
});

// Chat functionality
const API_KEY = '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'; // Your OpenAI API key
let conversationHistory = [];

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const message = userInput.value.trim();
    
    if (message) {
        userInput.disabled = true;
        sendButton.disabled = true;
        sendButton.innerHTML = '<div class="loading"></div>';
        
        addMessage(message, 'user');
        userInput.value = '';

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [
                        { role: 'system', content: 'You are the MBF Ambassador, providing information and promoting MBF products.' },
                        ...conversationHistory,
                        { role: 'user', content: message }
                    ]
                })
            });

            const data = await response.json();
            
            if (data.choices && data.choices[0]) {
                const botResponse = data.choices[0].message.content;
                addMessage(botResponse, 'bot');
                
                conversationHistory.push(
                    { role: 'user', content: message },
                    { role: 'assistant', content: botResponse }
                );
            } else {
                throw new Error('Invalid response from API');
            }
        } catch (error) {
            console.error('Error:', error);
            addMessage('Sorry, I encountered an error. Please try again later.', 'bot');
        } finally {
            userInput.disabled = false;
            sendButton.disabled = false;
            sendButton.textContent = 'Send';
            userInput.focus();
        }
    }
}

function addMessage(text, sender) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender + '-message');
    messageElement.textContent = text;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Add initial greeting
window.addEventListener('load', () => {
    setTimeout(() => {
        addMessage('Hello! I\'m the MBF Ambassador. How can I help you learn more about our products today?', 'bot');
    }, 1000);
});

// Background animation functions
function createShapes() {
    const background = document.getElementById('geometric-background');
    const shapeTypes = ['square', 'circle', 'triangle', 'rectangle'];
    
    for (let i = 0; i < 40; i++) {
        const shape = document.createElement('div');
        const shapeClass = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        shape.className = `shape ${shapeClass}`;
        
        // Random positions
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random animation properties
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 10;
        
        // Apply styles
        shape.style.left = `${posX}%`;
        shape.style.top = `${posY}%`;
        shape.style.animationDelay = `${delay}s`;
        shape.style.animationDuration = `${duration}s`;
        
        background.appendChild(shape);
    }
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positions
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random animation properties
        const delay = Math.random() * 8;
        const duration = Math.random() * 4 + 4;
        
        // Apply styles
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Call background animation functions on load
window.addEventListener('load', () => {
    createShapes();
    createParticles();
});

// Slide Modal Functions
function openSlideModal() {
    document.getElementById('slideModalOverlay').classList.add('active');
}
function closeSlideModal() {
    document.getElementById('slideModalOverlay').classList.remove('active');
}
