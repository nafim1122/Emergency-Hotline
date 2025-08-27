// Emergency services data
const emergencyServices = [
    {
        id: 1,
        name: "জাতীয় জরুরি সেবা",
        nameEn: "National Emergency Service",
        number: "999",
        category: "জরুরি সেবা",
        icon: "assets/emergency.png"
    },
    {
        id: 2,
        name: "পুলিশ",
        nameEn: "Police",
        number: "100",
        category: "আইন শৃঙ্খলা",
        icon: "assets/police.png"
    },
    {
        id: 3,
        name: "ফায়ার সার্ভিস",
        nameEn: "Fire Service",
        number: "101",
        category: "দমকল বাহিনী",
        icon: "assets/fire-service.png"
    },
    {
        id: 4,
        name: "অ্যাম্বুলেন্স সেবা",
        nameEn: "Ambulance Service",
        number: "102",
        category: "স্বাস্থ্য সেবা",
        icon: "assets/ambulance.png"
    },
    {
        id: 5,
        name: "রেলওয়ে পুলিশ",
        nameEn: "Railway Police",
        number: "1717",
        category: "রেল নিরাপত্তা",
        icon: "assets/Bangladesh-Railway.png"
    },
    {
        id: 6,
        name: "ব্র্যাক জরুরি সেবা",
        nameEn: "BRAC Emergency",
        number: "16263",
        category: "এনজিও সেবা",
        icon: "assets/brac.png"
    }
];

// Global variables
let heartCount = 0;
let coinCount = 100;
let copyCount = 0;
let callHistory = [];

// DOM elements
const heartCountElement = document.getElementById('heartCount');
const coinCountElement = document.getElementById('coinCount');
const copyCountElement = document.getElementById('copyCount');
const cardsGrid = document.getElementById('cardsGrid');
const historyContent = document.getElementById('historyContent');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderEmergencyCards();
    updateCounters();
    setupEventListeners();
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
            <img src="assets/heart.png" alt="Heart" class="heart-icon" data-service-id="${service.id}">
        </div>
        <div class="card-content">
            <h3>${service.name}</h3>
            <p class="service-name-en">${service.nameEn}</p>
            <p class="phone-number">${service.number}</p>
            <span class="category-badge">${service.category}</span>
        </div>
        <div class="card-buttons">
            <button class="card-button copy-btn" data-service-id="${service.id}">
                <i class="fas fa-copy"></i>
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
    
    // Add animation
    heartIcon.classList.add('heart-animation');
    heartIcon.classList.add('liked');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        heartIcon.classList.remove('heart-animation');
    }, 600);
    
    // Increase heart count
    heartCount++;
    updateCounters();
}

// Handle copy button clicks
function handleCopyClick(button) {
    const serviceId = parseInt(button.dataset.serviceId);
    const service = emergencyServices.find(s => s.id === serviceId);
    
    if (service) {
        // Copy number to clipboard
        copyToClipboard(service.number);
        
        // Show alert
        alert(`Hotline number ${service.number} has been copied to clipboard!`);
        
        // Increase copy count
        copyCount++;
        updateCounters();
        
        // Add animation to button
        button.classList.add('pulse-animation');
        setTimeout(() => {
            button.classList.remove('pulse-animation');
        }, 300);
    }
}

// Handle call button clicks
function handleCallClick(button) {
    const serviceId = parseInt(button.dataset.serviceId);
    const service = emergencyServices.find(s => s.id === serviceId);
    
    if (service) {
        // Check if user has enough coins
        if (coinCount < 20) {
            alert('Insufficient coins! You need at least 20 coins to make a call.');
            return;
        }
        
        // Deduct 20 coins
        coinCount -= 20;
        updateCounters();
        
        // Show call alert
        alert(`Calling ${service.name} (${service.nameEn}) at ${service.number}...`);
        
        // Add to call history
        addToCallHistory(service);
        
        // Add animation to button
        button.classList.add('pulse-animation');
        setTimeout(() => {
            button.classList.remove('pulse-animation');
        }, 300);
    }
}

// Copy text to clipboard
function copyToClipboard(text) {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Add service to call history
function addToCallHistory(service) {
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    
    const historyItem = {
        id: Date.now(),
        serviceName: service.name,
        serviceNameEn: service.nameEn,
        number: service.number,
        time: timeString
    };
    
    callHistory.unshift(historyItem); // Add to beginning of array
    renderCallHistory();
}

// Render call history
function renderCallHistory() {
    if (callHistory.length === 0) {
        historyContent.innerHTML = '<p class="no-history">No calls made yet</p>';
        return;
    }
    
    historyContent.innerHTML = callHistory.map(item => `
        <div class="history-item">
            <h4>${item.serviceName}</h4>
            <p><strong>English:</strong> ${item.serviceNameEn}</p>
            <p><strong>Number:</strong> ${item.number}</p>
            <p class="call-time"><i class="fas fa-clock"></i> Called at: ${item.time}</p>
        </div>
    `).join('');
}

// Clear call history
function clearCallHistory() {
    if (callHistory.length === 0) {
        alert('Call history is already empty!');
        return;
    }
    
    const confirmClear = confirm('Are you sure you want to clear all call history?');
    if (confirmClear) {
        callHistory = [];
        renderCallHistory();
        alert('Call history cleared successfully!');
    }
}

// Update counter displays
function updateCounters() {
    heartCountElement.textContent = heartCount;
    coinCountElement.textContent = coinCount;
    copyCountElement.textContent = copyCount;
}

// Add some interactive animations on page load
window.addEventListener('load', function() {
    // Add subtle animations to cards on load
    const cards = document.querySelectorAll('.emergency-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
});

// Handle responsive menu if needed (for future enhancement)
function handleResponsiveDesign() {
    const handleResize = () => {
        const width = window.innerWidth;
        
        // Adjust grid columns based on screen size
        if (width <= 480) {
            cardsGrid.style.gridTemplateColumns = '1fr';
        } else if (width <= 768) {
            cardsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
        } else {
            cardsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
        }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on load
}

// Initialize responsive design
handleResponsiveDesign();

// Add keyboard accessibility
document.addEventListener('keydown', function(e) {
    // Add keyboard shortcuts for better accessibility
    if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        document.querySelector('.history-section').scrollIntoView({ behavior: 'smooth' });
    }
    
    if (e.ctrlKey && e.key === 'c' && e.target.classList.contains('emergency-card')) {
        e.preventDefault();
        const copyButton = e.target.querySelector('.copy-btn');
        if (copyButton) {
            copyButton.click();
        }
    }
});
