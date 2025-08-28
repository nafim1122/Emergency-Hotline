// Emergency services data matching exact Figma design
const emergencyServices = [
    {
        id: 1,
        name: "National Emergency Number",
        nameEn: "National Emergency",
        number: "999",
        category: "All",
        icon: "assets/emergency.png"
    },
    {
        id: 2,
        name: "Police Helpline Number",
        nameEn: "Police",
        number: "999",
        category: "Police",
        icon: "assets/police.png"
    },
    {
        id: 3,
        name: "Fire Service Number",
        nameEn: "Fire Service",
        number: "999",
        category: "Fire",
        icon: "assets/fire-service.png"
    },
    {
        id: 4,
        name: "Ambulance Service",
        nameEn: "Ambulance",
        number: "1994-999999",
        category: "Health",
        icon: "assets/ambulance.png"
    },
    {
        id: 5,
        name: "Women & Child Helpline",
        nameEn: "Women & Child Helpline",
        number: "109",
        category: "Help",
        icon: "assets/emergency.png"
    },
    {
        id: 6,
        name: "Anti-Corruption Helpline",
        nameEn: "Anti-Corruption",
        number: "106",
        category: "Govt.",
        icon: "assets/emergency.png"
    },
    {
        id: 7,
        name: "Electricity Helpline",
        nameEn: "Electricity Outage", 
        number: "16216",
        category: "Electricity",
        icon: "assets/emergency.png"
    },
    {
        id: 8,
        name: "Brac Helpline",
        nameEn: "Brac",
        number: "16445",
        category: "NGO",
        icon: "assets/emergency.png"
    },
    {
        id: 9,
        name: "Bangladesh Railway Helpline",
        nameEn: "Bangladesh Railway",
        number: "163",
        category: "Travel",
        icon: "assets/Bangladesh-Railway.png"
    }
];

// Global variables
let heartCount = 0;
let coinCount = 100;
let copyCount = 0; // Starting with 0 copies made
let callHistory = [];

// DOM elements
const heartCountElement = document.getElementById('heartCount');
const coinCountElement = document.getElementById('coinCount');
const copyCountElement = document.getElementById('copyCount');
const cardsGrid = document.getElementById('cardsGrid');
const historyContent = document.getElementById('historyContent');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const toastElement = document.getElementById('toast');

// Initialize the application
// Reset to initial values function
function resetToInitialValues() {
    heartCount = 0;
    coinCount = 100; 
    copyCount = 0;
    callHistory = [];
    
    updateCounters();
    renderCallHistory();
    saveToLocalStorage();
    
    showToast('🔄 Reset to initial values!', 'success');
}

document.addEventListener('DOMContentLoaded', function() {
    // Reset to initial values on page load
    resetToInitialValues();
    
    renderEmergencyCards();
    setupEventListeners();
    
    // Don't load from localStorage since we want initial values
    // loadFromLocalStorage();
});

// Render emergency service cards
function renderEmergencyCards() {
    cardsGrid.innerHTML = '';
    
    emergencyServices.forEach(service => {
        const cardElement = createEmergencyCard(service);
        cardsGrid.appendChild(cardElement);
    });
}

// Create individual emergency card
function createEmergencyCard(service) {
    const card = document.createElement('div');
    card.className = 'emergency-card';
    card.innerHTML = `
        <div class="card-header">
            <img src="${service.icon}" alt="${service.name}" class="card-icon">
            <i class="fas fa-heart heart-icon" data-service-id="${service.id}"></i>
        </div>
        <div class="card-content">
            <h3>${service.name}</h3>
            <p class="service-name-en">${service.nameEn}</p>
            <p class="phone-number">${service.number}</p>
            <span class="category-badge">${service.category}</span>
        </div>
        <div class="card-buttons">
            <button class="card-button copy-btn" data-service-id="${service.id}">
                <i class="far fa-copy"></i>
                Copy
            </button>
            <button class="card-button call-btn" data-service-id="${service.id}">
                <i class="fas fa-phone"></i>
                Call
            </button>
        </div>
    `;
    
    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Heart icon clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('heart-icon')) {
            handleHeartClick(e.target);
        }
    });
    
    // Copy button clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('copy-btn') || e.target.parentElement.classList.contains('copy-btn')) {
            const button = e.target.classList.contains('copy-btn') ? e.target : e.target.parentElement;
            handleCopyClick(button);
        }
    });
    
    // Call button clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('call-btn') || e.target.parentElement.classList.contains('call-btn')) {
            const button = e.target.classList.contains('call-btn') ? e.target : e.target.parentElement;
            handleCallClick(button);
        }
    });
    
    // Clear history button
    clearHistoryBtn.addEventListener('click', clearCallHistory);
}

// Handle heart icon clicks
function handleHeartClick(heartIcon) {
    const serviceId = parseInt(heartIcon.dataset.serviceId);
    const service = emergencyServices.find(s => s.id === serviceId);
    
    // Add animation and visual feedback
    heartIcon.classList.add('heart-animation');
    heartIcon.classList.toggle('liked');
    
    // Show brief feedback message
    if (heartIcon.classList.contains('liked')) {
        // Increase heart count
        heartCount++;
        // Give coins for liking a service (helps with copy/call costs)
        coinCount += 25; // Give 25 coins (enough for 1 copy or 1+ call)
        copyCount++; // Still give copy credit as bonus
        showToast(`❤️ Added ${service.nameEn} to favorites! (+25 coins, +1 copy credit)`, 'success');
    } else {
        // Decrease heart count
        heartCount = Math.max(0, heartCount - 1);
        showToast(`Removed ${service.nameEn} from favorites`, 'info');
    }
    
    // Remove animation class after animation completes
    setTimeout(() => {
        heartIcon.classList.remove('heart-animation');
    }, 600);
    
    updateCounters();
    saveToLocalStorage();
    
    // Add particle effect (optional visual enhancement)
    if (heartIcon.classList.contains('liked')) {
        createHeartParticle(heartIcon);
    }
}

// Create heart particle effect
function createHeartParticle(element) {
    const particle = document.createElement('div');
    particle.innerHTML = '❤️';
    particle.style.cssText = `
        position: absolute;
        pointer-events: none;
        font-size: 1.2rem;
        animation: floatUp 1.5s ease-out forwards;
        z-index: 10;
        top: ${element.getBoundingClientRect().top}px;
        left: ${element.getBoundingClientRect().left}px;
    `;
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        document.body.removeChild(particle);
    }, 1500);
}

// Handle copy button clicks
function handleCopyClick(button) {
    // Check if user has enough coins before attempting to copy
    if (coinCount < 20) {
        alert(`❌ Insufficient Coins!\n\nYou need at least 20 coins to copy a number.\nCurrent coins: ${coinCount}\n\nPlease like services (❤️) to earn more coins!`);
        showToast('❌ Not enough coins to copy!', 'error');
        return;
    }
    
    const serviceId = parseInt(button.dataset.serviceId);
    const service = emergencyServices.find(s => s.id === serviceId);
    
    // Try modern clipboard API first, then fallback
    if (navigator.clipboard && window.isSecureContext) {
        // Modern clipboard API
        navigator.clipboard.writeText(service.number)
            .then(() => {
                copySuccess(service, button);
            })
            .catch(err => {
                copyFallback(service, button);
            });
    } else {
        // Fallback for older browsers or non-HTTPS
        copyFallback(service, button);
    }
}

// Helper function for successful copy
function copySuccess(service, button) {
    // Deduct 20 coins for copying
    coinCount -= 20;
    
    // Increase copy count display (shows total successful copies)
    copyCount++;
    
    updateCounters();
    saveToLocalStorage();
    
    // Show feedback with coin deduction
    showToast(`📋 ${service.number} copied! (-20 coins)`, 'success');
    
    // Add animation to button
    button.classList.add('copy-animation');
    setTimeout(() => {
        button.classList.remove('copy-animation');
    }, 500);
}

// Fallback copy method
function copyFallback(service, button) {
    // Create a temporary textarea element
    const textArea = document.createElement('textarea');
    textArea.value = service.number;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            copySuccess(service, button);
        } else {
            showToast('❌ Failed to copy number', 'error');
        }
    } catch (err) {
        showToast('❌ Copy not supported in this browser', 'error');
        console.error('Copy failed: ', err);
    }
    
    document.body.removeChild(textArea);
}

// Handle call button clicks
function handleCallClick(button) {
    const serviceId = parseInt(button.dataset.serviceId);
    const service = emergencyServices.find(s => s.id === serviceId);
    
    // Check if user has enough coins (minimum 20 coins required)
    if (coinCount < 20) {
        alert(`❌ Insufficient Coins!\n\nYou need at least 20 coins to make a call.\nCurrent coins: ${coinCount}\n\nPlease like services (❤️) to earn coins!`);
        showToast('❌ Not enough coins to make call!', 'error');
        return; // Terminate the process
    }
    
    // Show alert with service name and number
    alert(`📞 Calling Emergency Service\n\nService: ${service.name}\nNumber: ${service.number}\n\nCall initiated successfully!\nCost: 20 coins`);
    
    // Deduct 20 coins for the call
    coinCount -= 20;
    
    // Add to call history
    addToCallHistory(service);
    
    // Show success feedback
    showToast(`📞 Called ${service.nameEn} - 20 coins deducted`, 'success');
    
    // Add animation to button
    button.classList.add('call-animation');
    setTimeout(() => {
        button.classList.remove('call-animation');
    }, 500);
    
    // Update counters and save
    updateCounters();
    saveToLocalStorage();
}

// Add to call history
function addToCallHistory(service) {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const historyItem = {
        id: Date.now(),
        serviceId: service.id,
        serviceName: service.name,
        serviceNameEn: service.nameEn,
        number: service.number,
        icon: service.icon,
        time: timeString,
        date: now
    };
    
    // Add to beginning of array
    callHistory.unshift(historyItem);
    
    // Limit history to 10 items
    if (callHistory.length > 10) {
        callHistory.pop();
    }
    
    renderCallHistory();
    saveToLocalStorage();
}

// Render call history
function renderCallHistory() {
    if (callHistory.length === 0) {
        historyContent.innerHTML = '<p class="no-history">No calls made yet</p>';
        return;
    }
    
    historyContent.innerHTML = '';
    
    callHistory.forEach(item => {
        const historyItemElement = document.createElement('div');
        historyItemElement.className = 'history-item';
        historyItemElement.innerHTML = `
            <img src="${item.icon}" alt="${item.serviceName}" class="history-icon">
            <div class="history-details">
                <p class="history-service-name">${item.serviceName}</p>
                <p class="history-number">${item.number}</p>
                <p class="history-time">${item.time}</p>
            </div>
        `;
        
        historyContent.appendChild(historyItemElement);
    });
}

// Clear call history
function clearCallHistory() {
    callHistory = [];
    renderCallHistory();
    saveToLocalStorage();
    showToast('Call history cleared', 'info');
}

// Update counters in UI
function updateCounters() {
    heartCountElement.textContent = heartCount;
    coinCountElement.textContent = coinCount;
    copyCountElement.textContent = copyCount;
}

// Show toast notification
function showToast(message, type = 'info') {
    toastElement.textContent = message;
    toastElement.className = `toast-notification ${type} show`;
    
    setTimeout(() => {
        toastElement.classList.remove('show');
    }, 3000);
}

// Save data to local storage
function saveToLocalStorage() {
    const data = {
        heartCount,
        coinCount,
        copyCount,
        callHistory
    };
    
    localStorage.setItem('emergencyServiceData', JSON.stringify(data));
}

// Load data from local storage
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('emergencyServiceData');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        heartCount = data.heartCount || 0;
        coinCount = data.coinCount || 100;
        copyCount = data.copyCount || 0;
        callHistory = data.callHistory || [];
        
        updateCounters();
        renderCallHistory();
    }
}
