const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,?!'_-&@#$%*()/:<>|+= ";

// Encryption function
function encryptText(text, key) {
    let encryptedText = "";

    for (let i = 0; i < text.length; i++) {
        const textChar = text[i];
        const keyChar = key[i % key.length];

        const textIndex = alphabet.indexOf(textChar);
        const keyIndex = alphabet.indexOf(keyChar);

        if (textIndex === -1) {
            encryptedText += textChar;
        } else {
            const newIndex = (textIndex + keyIndex) % alphabet.length;
            encryptedText += alphabet[newIndex];
        }
    }

    return encryptedText;
}

// Decrypt function
function decryptText(encryptedText, key) {
    let decryptedText = "";

    for (let i = 0; i < encryptedText.length; i++) {
        const encryptedChar = encryptedText[i];
        const keyChar = key[i % key.length];

        const encryptedIndex = alphabet.indexOf(encryptedChar);
        const keyIndex = alphabet.indexOf(keyChar);

        if (encryptedIndex === -1) {
            decryptedText += encryptedChar;
        } else {
            let newIndex = encryptedIndex - keyIndex;
            if (newIndex < 0) newIndex += alphabet.length;
            decryptedText += alphabet[newIndex];
        }
    }

    return decryptedText;
}

// Update result with animation
function updateResult(isEncrypting) {
    const text = document.getElementById("message").value;
    const key = document.getElementById("key").value;
    const resultDiv = document.getElementById("result");
    const encBtn = document.getElementById("enc-btn");
    const decBtn = document.getElementById("dec-btn");

    // Add loading animation
    resultDiv.innerHTML = '<div class="loading"></div> Processing...';
    resultDiv.style.textAlign = 'center';
    resultDiv.style.color = '';
    resultDiv.classList.remove('copy-success');
    
    // Add active state to clicked button
    if (isEncrypting) {
        encBtn.classList.add('encrypting');
        setTimeout(() => encBtn.classList.remove('encrypting'), 1500);
    } else {
        decBtn.classList.add('encrypting');
        setTimeout(() => decBtn.classList.remove('encrypting'), 1500);
    }

    // Simulate processing delay for better UX
    setTimeout(() => {
        let result = "";
        
        if (isEncrypting) {
            result = encryptText(text, key);
            resultDiv.style.borderColor = '#4a90e2';
        } else {
            result = decryptText(text, key);
            resultDiv.style.borderColor = '#e24a4a';
        }

        // Set plain text content
        resultDiv.innerHTML = '';
        resultDiv.textContent = result;
        resultDiv.style.textAlign = 'left';
        resultDiv.style.color = '';
        
        // Add fade in animation
        resultDiv.style.animation = 'fadeIn 0.5s ease';
        
        // Update character counters
        updateCounters();
    }, 300);
}

// Update character counters
function updateCounters() {
    const message = document.getElementById("message").value;
    const key = document.getElementById("key").value;
    
    document.getElementById("message-counter").textContent = `Message: ${message.length} characters`;
    document.getElementById("key-counter").textContent = `Key: ${key.length} characters`;
}

// Toggle dark/light mode
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById("theme-toggle");
    const icon = themeToggle.querySelector("i");
    const text = themeToggle.querySelector("span");
    
    body.classList.toggle("dark-mode");
    
    if (body.classList.contains("dark-mode")) {
        icon.className = "fas fa-sun";
        text.textContent = "Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        icon.className = "fas fa-moon";
        text.textContent = "Dark Mode";
        localStorage.setItem("theme", "light");
    }
}

// Initialize theme from localStorage
function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const themeToggle = document.getElementById("theme-toggle");
    const icon = themeToggle.querySelector("i");
    const text = themeToggle.querySelector("span");
    
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        icon.className = "fas fa-sun";
        text.textContent = "Light Mode";
    }
}

// Fallback copy function for older browsers
function copyToClipboardFallback(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        return successful;
    } catch (err) {
        console.error('Fallback copy failed:', err);
        return false;
    } finally {
        document.body.removeChild(textArea);
    }
}

// Helper function to show copy success
function showCopySuccess(resultDiv) {
    const originalText = resultDiv.textContent;
    resultDiv.classList.add('copy-success');
    resultDiv.innerHTML = '<span style="color: #4a90e2; font-weight: 600;">✅ Copied to clipboard!</span>';
    resultDiv.style.textAlign = 'center';
    
    setTimeout(() => {
        resultDiv.textContent = originalText;
        resultDiv.style.textAlign = 'left';
        resultDiv.classList.remove('copy-success');
    }, 1500);
}

// Helper function to show copy error
function showCopyError(resultDiv) {
    const originalText = resultDiv.textContent;
    resultDiv.innerHTML = '<span style="color: #e24a4a;">❌ Failed to copy</span>';
    resultDiv.style.textAlign = 'center';
    
    setTimeout(() => {
        resultDiv.textContent = originalText;
        resultDiv.style.textAlign = 'left';
    }, 1500);
}

// Main copy function
function copyToClipboard() {
    const resultDiv = document.getElementById("result");
    
    // Get the actual text content
    let result = resultDiv.textContent || resultDiv.innerText;
    
    // Check if result is valid
    if (!result || 
        result.includes("Processing...") || 
        result.includes("Copied") ||
        result.includes("Failed") ||
        result.trim() === '') {
        return;
    }
    
    // Try Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(result).then(() => {
            showCopySuccess(resultDiv);
        }).catch(err => {
            console.error('Clipboard API failed:', err);
            // Try fallback
            if (copyToClipboardFallback(result)) {
                showCopySuccess(resultDiv);
            } else {
                showCopyError(resultDiv);
            }
        });
    } else {
        // Use fallback for non-HTTPS or older browsers
        if (copyToClipboardFallback(result)) {
            showCopySuccess(resultDiv);
        } else {
            showCopyError(resultDiv);
        }
    }
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Set initial encrypted text
    updateResult(true);
    
    // Add event listeners to buttons
    document.getElementById("enc-btn").addEventListener('click', function () {
        updateResult(true);
    });

    document.getElementById("dec-btn").addEventListener('click', function () {
        updateResult(false);
    });
    
    // Theme toggle
    document.getElementById("theme-toggle").addEventListener('click', toggleTheme);
    
    // Copy result on click
    document.getElementById("result").addEventListener('click', copyToClipboard);
    
    // Real-time character counting
    document.getElementById("message").addEventListener('input', updateCounters);
    document.getElementById("key").addEventListener('input', updateCounters);
    
    // Add auto-update on input with debouncing
    let timeout;
    function debounceUpdate() {
        clearTimeout(timeout);
        timeout = setTimeout(() => updateResult(true), 500);
    }
    
    document.getElementById("message").addEventListener('input', debounceUpdate);
    document.getElementById("key").addEventListener('input', debounceUpdate);
    
    // Initialize counters
    updateCounters();
});