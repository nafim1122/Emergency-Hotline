// Emergency services data based on Figma design
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
        icon: "assets/brac.png"
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
let copyCount = 2; // Starting with 2 as shown in design
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

// Update counter displays with animations
function updateCounters() {
    const heartCountElement = document.getElementById('heartCount');
    const coinCountElement = document.getElementById('coinCount');
    const copyCountElement = document.getElementById('copyCount');
    
    // Add pulse animation when counters change
    const animateCounter = (element, newValue) => {
        element.style.transform = 'scale(1.2)';
        element.style.color = '#00b894';
        element.textContent = newValue;
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 200);
    };
    
    // Update with animation
    if (heartCountElement.textContent != heartCount) {
        animateCounter(heartCountElement, heartCount);
    } else {
        heartCountElement.textContent = heartCount;
    }
    
    if (coinCountElement.textContent != coinCount) {
        animateCounter(coinCountElement, coinCount);
    } else {
        coinCountElement.textContent = coinCount;
    }
    
    if (copyCountElement.textContent != copyCount) {
        animateCounter(copyCountElement, copyCount);
    } else {
        copyCountElement.textContent = copyCount;
    }
}

// Add some interactive animations on page load
window.addEventListener('load', function() {
    // Add staggered animations to cards on load
    const cards = document.querySelectorAll('.emergency-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, (index * 100) + 300);
    });
    
    // Animate counter numbers on load
    animateCounters();
});

// Animate counter numbers
function animateCounters() {
    const heartCounter = document.getElementById('heartCount');
    const coinCounter = document.getElementById('coinCount');
    const copyCounter = document.getElementById('copyCount');
    
    // Add a subtle pulse animation to counters when they change
    [heartCounter, coinCounter, copyCounter].forEach(counter => {
        counter.style.transition = 'all 0.3s ease';
    });
}

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
