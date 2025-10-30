
    let r;
    let currentRiveSrc;
    let loadingRive;
    let loadingProgress = 0;
    let isMainRiveLoaded = false;
let riveSlideInstance;
const LOCAL_VIDEO_SOURCES = {
    intro: 'ami.mp4',
    feedback: 'videofeedback.mp4'
};

    // Initialize loading screen
    function initializeLoadingScreen() {
        const loadingCanvas = document.getElementById('loadingCanvas');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        loadingRive = new rive.Rive({
            src: 'mbf.riv',
            canvas: loadingCanvas,
            autoplay: true,
            stateMachines: 'State Machine 1',
            fit: rive.Fit.cover,
            onLoad: () => {
                // Start the loading progress simulation
                simulateLoadingProgress();
            },
        });
    }

    // Simulate loading progress
    function simulateLoadingProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        const interval = setInterval(() => {
            loadingProgress += Math.random() * 15; // Random increment for realistic feel
            
            if (loadingProgress > 100) {
                loadingProgress = 100;
                clearInterval(interval);
            }
            
            progressFill.style.width = loadingProgress + '%';
            progressText.textContent = Math.round(loadingProgress) + '%';
            
            // Update the loading animation based on progress
            if (loadingRive && loadingRive.stateMachineInputs) {
                const inputs = loadingRive.stateMachineInputs('State Machine 1');
                const percentInput = inputs.find(i => i.name === 'percent');
                if (percentInput) {
                    percentInput.value = loadingProgress;
                }
            }
            
            // Check if main Rive is loaded and progress is complete
            if (isMainRiveLoaded && loadingProgress >= 100) {
                setTimeout(() => {
                    hideLoadingScreen();
                }, 500);
            }
        }, 100);
    }

    // Hide loading screen
    function hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('hidden');
        
        // Clean up loading Rive instance
        if (loadingRive) {
            loadingRive.stop();
            loadingRive.cleanup();
        }
        
        // Remove loading screen from DOM after transition
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }

    function initializeRive(src) {
        if (r) {
            // Stop and dispose of the previous Rive instance if it exists
            r.stop();
            r.cleanup();
        }
        const riveCanvas = document.getElementById("riveCanvas");
        
        // Ensure canvas supports transparency for blending
        riveCanvas.style.background = 'transparent';
        
        r = new rive.Rive({
            src: src,
            canvas: riveCanvas,
            autoplay: true,
            autoBind: true,
            isTouchScrollEnabled: true,
            stateMachines: "State Machine 1",
            artboard: "Main",
            onLoad: () => {
                r.resizeDrawingSurfaceToCanvas();
                // Clear canvas with transparent background
                const ctx = riveCanvas.getContext('2d');
                if (ctx) {
                    ctx.globalCompositeOperation = 'source-over';
                }
                // Mark main Rive as loaded
                isMainRiveLoaded = true;
            },
        });
        r.on(rive.EventType.RiveEvent, onRiveEventReceived);
        currentRiveSrc = src;
    }

    function handleRiveSource() {
        let newRiveSrc = "product_platform2.riv";

        if (window.matchMedia("(max-width: 768px) and (orientation: portrait)").matches) {
            newRiveSrc = "product_mobile.riv";
        } else if (window.matchMedia("(max-width: 768px) and (orientation: landscape)").matches) {
            newRiveSrc = "product_platform2.riv";
        }

        if (newRiveSrc !== currentRiveSrc) {
            initializeRive(newRiveSrc);
        } else if (!r) {
            // Initial load if Rive hasn't been initialized yet
            initializeRive(newRiveSrc);
        }
    }

    // Initialize loading screen first
    initializeLoadingScreen();
    
    // Initial load of Rive Animation
    handleRiveSource();

    // Adjust canvas size on window resize for full responsiveness
    window.addEventListener('resize', () => {
        handleRiveSource(); // Re-evaluate and potentially reload Rive
        if (r) {
            r.resizeDrawingSurfaceToCanvas();
        }
    });

    function onRiveEventReceived(riveEvent) {
        const eventData = riveEvent.data;
        console.log(eventData); // <-- Add this line

        if (eventData.name === "akaweb3") {
            if (eventData.url) {
                window.open(eventData.url);
            } else {
                alert('No URL provided for this event!');
            }
        } else if (eventData.name === "akafb3") {
            if (eventData.url) {
                window.open(eventData.url);
            } else {
                alert('No URL provided for this event!');
            }
        } else if (eventData.name === "akalink3") {
            if (eventData.url) {
                window.open(eventData.url);
            } else {
                alert('No URL provided for this event!');
            }
        }
    }
    
    //water background
        const waterHighlights = document.querySelector('.water-highlights');
    const particleContainer = document.querySelector('.particle-container');
    const waterBackground = document.querySelector('.water-background');
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    window.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });
    
    function updateHighlightPosition() {
        const targetX = (mouseX / window.innerWidth) * 100;
        const targetY = (mouseY / window.innerHeight) * 100;
    
        const currentX = parseFloat(waterHighlights.style.getPropertyValue('--highlight-x') || 50);
        const currentY = parseFloat(waterHighlights.style.getPropertyValue('--highlight-y') || 50);
    
        const lerpFactor = 0.05;
        const newX = currentX + (targetX - currentX) * lerpFactor;
        const newY = currentY + (targetY - currentY) * lerpFactor;
    
        waterHighlights.style.setProperty('--highlight-x', `${newX}%`);
        waterHighlights.style.setProperty('--highlight-y', `${newY}%`);
    
        waterHighlights.style.setProperty('--highlight-opacity', '0.8'); 
    }
    
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
    
        const endX = (Math.random() - 0.5) * 100;
        const endY = (Math.random() - 0.5) * 100;
        particle.style.setProperty('--particle-end-x', `${endX}px`);
        particle.style.setProperty('--particle-end-y', `${endY}px`);
    
        particleContainer.appendChild(particle);
    
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
    
    let lastParticleTime = 0;
    const particleInterval = 100;
    
    window.addEventListener('mousemove', (event) => {
        const currentTime = Date.now();
        if (currentTime - lastParticleTime > particleInterval) {
            createParticle(event.clientX + (Math.random() - 0.5) * 10, event.clientY + (Math.random() - 0.5) * 10);
            lastParticleTime = currentTime;
        }
    });
    
    function animate() {
        updateHighlightPosition();
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Chat functionality
  /*  const API_KEY = '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'; // Your OpenAI API key
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
    
    // Ensure loading screen starts when page loads
    window.addEventListener('DOMContentLoaded', () => {
        // Loading screen is already initialized above
    });
    */
    
    // Slide Modal Functions
    function openSlideModal() {
        document.getElementById('slideModalOverlay').classList.add('active');
    }
    function closeSlideModal() {
        document.getElementById('slideModalOverlay').classList.remove('active');
    }
    
    // Rive Slide Modal (1920x1080) Functions
    function openRiveSlide() {
        const overlay = document.getElementById('riveSlideOverlay');
        const canvas = document.getElementById('riveSlideCanvas');
        overlay.classList.add('active');
        
        // Cleanup previous instance if any
        if (riveSlideInstance) {
            try { riveSlideInstance.stop(); riveSlideInstance.cleanup(); } catch (e) {}
            riveSlideInstance = null;
        }
        
        // Ensure canvas background
        canvas.style.background = '#000';
        
        riveSlideInstance = new rive.Rive({
            src: 'slide.riv',
            canvas: canvas,
            autoplay: true,
            artboard: 'Slide',
            stateMachines: 'State Machine 1',
            fit: rive.Fit.contain,
            onLoad: () => {
                // Match drawing surface to current CSS-rendered size
                riveSlideInstance.resizeDrawingSurfaceToCanvas();
            },
        });
    }
    
    function closeRiveSlide() {
        const overlay = document.getElementById('riveSlideOverlay');
        overlay.classList.remove('active');
        if (riveSlideInstance) {
            try { riveSlideInstance.stop(); riveSlideInstance.cleanup(); } catch (e) {}
            riveSlideInstance = null;
        }
    }

    // Close modal when clicking outside the frame (on overlay)
    (function setupRiveSlideOverlayClickToClose(){
        const overlay = document.getElementById('riveSlideOverlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    closeRiveSlide();
                }
            });
        }
    })();

    // Local Video Modal (for playing local files)
    function openLocalVideoModal(src) {
        const overlay = document.getElementById('localVideoModalOverlay');
        const video = document.getElementById('localVideoElement');
        if (!overlay || !video) return;
        video.src = src;
        video.load();
        overlay.classList.add('active');
        // Attempt autoplay; browsers generally allow if user interacted (button click)
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {/* ignore autoplay rejection */});
        }
    }

    function closeLocalVideoModal() {
        const overlay = document.getElementById('localVideoModalOverlay');
        const video = document.getElementById('localVideoElement');
        if (!overlay || !video) return;
        video.pause();
        video.currentTime = 0;
        video.removeAttribute('src');
        overlay.classList.remove('active');
    }

    // Public API for buttons
    function playLocalVideo(type) {
        const src = LOCAL_VIDEO_SOURCES[type];
        if (!src) return;
        openLocalVideoModal(src);
    }

    // Close local video when clicking on overlay outside the player
    (function setupLocalVideoOverlayClickToClose(){
        const overlay = document.getElementById('localVideoModalOverlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    closeLocalVideoModal();
                }
            });
        }
    })();

    // Video Modal Functions
    const videoModalOverlay = document.getElementById('videoModalOverlay');
    const iframe = document.getElementById('vimeoPlayer');
    console.log('Vimeo Player Iframe Element:', iframe); // Add this line
    const player = new Vimeo.Player(iframe);
    const volumeButton = document.getElementById('volumeButton');
    let isMuted = true;
    
    function openVideoModal() {
        videoModalOverlay.style.display = 'flex';
        player.play();
        updateVolumeButton();
    }
    
    function closeVideoModal() {
        videoModalOverlay.style.display = 'none';
        player.pause();
        player.setCurrentTime(0);
    }
    
    function toggleVolume() {
        isMuted = !isMuted;
        player.setVolume(isMuted ? 0 : 1);
        updateVolumeButton();
    }
    
    function updateVolumeButton() {
        if (isMuted) {
            volumeButton.classList.remove('unmuted');
            volumeButton.classList.add('muted');
        } else {
            volumeButton.classList.remove('muted');
            volumeButton.classList.add('unmuted');
        }
    }
    
    volumeButton.addEventListener('click', toggleVolume);
    
    // Set initial state
    player.setVolume(0);
    updateVolumeButton();

    // Contact Modal Functions
    function openContactModal() {
        document.getElementById('contactModalOverlay').classList.add('active');
    }
    
    function closeContactModal() {
        document.getElementById('contactModalOverlay').classList.remove('active');
    }
    
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
    
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
    
        const formData = {
            name: name,
            email: email,
            phone: phone,
            message: message,
            timestamp: new Date().toISOString()
        };
    
        console.log('Form Data:', formData);
    
        // In a real application, you would send this formData to a server-side endpoint.
        // Example using fetch API (requires a backend to handle the request):
        /*
        fetch('/save-contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Your inquiry has been submitted!');
            closeContactModal();
            document.getElementById('contactForm').reset(); // Clear the form
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error submitting your inquiry. Please try again later.');
        });
        */
    
        alert('Your inquiry has been submitted! (Data logged to console)');
        closeContactModal();
        document.getElementById('contactForm').reset(); // Clear the form
    });


const riveLogoCanvas = document.getElementById('riveLogoCanvas');
if (riveLogoCanvas) {
    new rive.Rive({
        src: 'loading_motion.riv',
        canvas: riveLogoCanvas,
        autoplay: true,
        artboard: 'render',
        stateMachines: 'State Machine 1',
    });
}


    
