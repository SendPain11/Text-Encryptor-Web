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

        resultDiv.textContent = result;
        resultDiv.style.textAlign = 'left';
        
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
    const result = document.getElementById("result").textContent;
    
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

// Copy result to clipboard
function copyToClipboard() {
    const result = document.getElementById("result").textContent;
    
    if (!result || result.includes("Processing...")) {
        return;
    }
    
    navigator.clipboard.writeText(result).then(() => {
        const originalText = result;
        document.getElementById("result").textContent = "Copied to clipboard!";
        document.getElementById("result").style.textAlign = 'center';
        document.getElementById("result").style.color = '#4a90e2';
        
        setTimeout(() => {
            document.getElementById("result").textContent = originalText;
            document.getElementById("result").style.textAlign = 'left';
            document.getElementById("result").style.color = '';
        }, 1500);
    });
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
    
    // Add title animation
    const title = document.querySelector('h1');
    title.style.animation = 'slideUp 0.5s ease';
});