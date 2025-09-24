document.addEventListener('DOMContentLoaded', () => {

    // Voice-activated SOS
    const voiceSosBtn = document.getElementById('voice-sos-btn');
    
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();

        voiceSosBtn.addEventListener('click', () => {
            recognition.start();
        });

        recognition.addEventListener('start', () => {
            voiceSosBtn.textContent = '🔊';
            voiceSosBtn.style.borderColor = 'var(--sos-red)';
        });

        recognition.addEventListener('end', () => {
            voiceSosBtn.textContent = '🎤';
             voiceSosBtn.style.borderColor = 'var(--text-light)';
        });

        recognition.addEventListener('result', (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            
            // Check for keywords like "help" or "SOS"
            if (transcript.includes('help') || transcript.includes('sos')) {
                console.log('Emergency keyword detected! Calling 100...');
                // Trigger the emergency call
                window.location.href = 'tel:100';
            }
        });

    } else {
        // Hide the button if the browser doesn't support the API
        voiceSosBtn.style.display = 'none';
        console.log("Speech Recognition API not supported in this browser.");
    }
});