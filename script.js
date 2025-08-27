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
        number: "100",
        category: "Police",
        icon: "assets/police.png"
    },
    {
        id: 3,
        name: "Fire Service Number",
        nameEn: "Fire Service",
        number: "101",
        category: "Fire",
        icon: "assets/fire-service.png"
    },
    {
        id: 4,
        name: "Ambulance Service",
        nameEn: "Ambulance",
        number: "102",
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
        name: "BRAC Emergency Helpline",
        nameEn: "BRAC Emergency",
        number: "16263",
        category: "Emergency",
        icon: "assets/brac.png"
    },
    {
        id: 9,
        name: "Railway Police Helpline",
        nameEn: "Railway Police",
        number: "1717",
        category: "Police",
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
    const service = emergencyServices.find(s => s.id === serviceId);
    
    // Add animation and visual feedback
    heartIcon.classList.add('heart-animation');
    heartIcon.classList.add('liked');
    
    // Show brief feedback message
    showToast(`❤️ Added ${service.nameEn} to favorites!`, 'success');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        heartIcon.classList.remove('heart-animation');
    }, 600);
    
    // Increase heart count
    heartCount++;
    updateCounters();
    
    // Add particle effect (optional visual enhancement)
    createHeartParticle(heartIcon);
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
        z-index: 1000;
    `;
    
    const rect = element.getBoundingClientRect();
    particle.style.left = rect.left + 'px';
    particle.style.top = rect.top + 'px';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        document.body.removeChild(particle);
    }, 1500);
}

// Handle copy button clicks
function handleCopyClick(button) {
    const serviceId = parseInt(button.dataset.serviceId);
    const service = emergencyServices.find(s => s.id === serviceId);
    
    if (service) {
        // Copy number to clipboard using modern API if available
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(service.number).then(() => {
                showToast(`📋 ${service.number} copied to clipboard!`, 'success');
            }).catch(() => {
                // Fallback to older method
                copyToClipboardFallback(service.number);
                showToast(`📋 ${service.number} copied to clipboard!`, 'success');
            });
        } else {
            // Fallback for older browsers
            copyToClipboardFallback(service.number);
            showToast(`📋 ${service.number} copied to clipboard!`, 'success');
        }
        
        // Increase copy count
        copyCount++;
        updateCounters();
        
        // Add animation to button
        button.classList.add('pulse-animation');
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        
        setTimeout(() => {
            button.classList.remove('pulse-animation');
            button.innerHTML = '<i class="far fa-copy"></i> Copy';
        }, 1000);
    }
}

// Modern clipboard fallback
function copyToClipboardFallback(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Handle call button clicks
function handleCallClick(button) {
    const serviceId = parseInt(button.dataset.serviceId);
    const service = emergencyServices.find(s => s.id === serviceId);
    
    if (service) {
        // Check if user has enough coins
        if (coinCount < 20) {
            showToast('💰 Insufficient coins! You need at least 20 coins to make a call.', 'error');
            
            // Shake animation for insufficient coins
            button.classList.add('shake-animation');
            setTimeout(() => {
                button.classList.remove('shake-animation');
            }, 500);
            return;
        }
        
        // Deduct 20 coins
        coinCount -= 20;
        updateCounters();
        
        // Show enhanced call confirmation
        const confirmCall = confirm(`📞 Call ${service.name}?\n\nService: ${service.nameEn}\nNumber: ${service.number}\nCost: 20 coins\n\nProceed with call?`);
        
        if (confirmCall) {
            // Show call success message
            showToast(`📞 Calling ${service.nameEn} at ${service.number}...`, 'info');
            
            // Add to call history
            addToCallHistory(service);
            
            // Enhanced button animation
            button.classList.add('pulse-animation');
            button.innerHTML = '<i class="fas fa-phone-alt"></i> Calling...';
            
            setTimeout(() => {
                button.classList.remove('pulse-animation');
                button.innerHTML = '<i class="fas fa-phone"></i> Call';
                showToast(`✅ Call to ${service.nameEn} completed!`, 'success');
            }, 2000);
        } else {
            // Refund coins if user cancels
            coinCount += 20;
            updateCounters();
            showToast('❌ Call cancelled. Coins refunded.', 'info');
        }
    }
}

// Add service to call history with enhanced details
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
        time: timeString,
        cost: 20
    };
    
    callHistory.unshift(historyItem); // Add to beginning of array
    renderCallHistory();
    
    // Show success notification
    showToast(`📝 Call record added to history`, 'success');
}

// Render call history with enhanced styling
function renderCallHistory() {
    if (callHistory.length === 0) {
        historyContent.innerHTML = '<p class="no-history">📞 No calls made yet</p>';
        return;
    }
    
    historyContent.innerHTML = callHistory.map((item, index) => `
        <div class="history-item" style="animation: slideInUp 0.3s ease-out ${index * 0.1}s both;">
            <h4>🚨 ${item.serviceName}</h4>
            <p><strong>English:</strong> ${item.serviceNameEn}</p>
            <p><strong>Number:</strong> ${item.number}</p>
            <p><strong>Cost:</strong> ${item.cost} coins</p>
            <p class="call-time"><i class="fas fa-clock"></i> Called at: ${item.time}</p>
        </div>
    `).join('');
}

// Clear call history with confirmation
function clearCallHistory() {
    if (callHistory.length === 0) {
        showToast('📝 Call history is already empty!', 'info');
        return;
    }
    
    const confirmClear = confirm(`🗑️ Clear all call history?\n\nThis will permanently delete ${callHistory.length} call record(s).\n\nAre you sure?`);
    if (confirmClear) {
        const clearedCount = callHistory.length;
        callHistory = [];
        renderCallHistory();
        showToast(`✅ Cleared ${clearedCount} call record(s) successfully!`, 'success');
        
        // Add animation to clear button
        const clearBtn = document.getElementById('clearHistoryBtn');
        clearBtn.classList.add('pulse-animation');
        setTimeout(() => {
            clearBtn.classList.remove('pulse-animation');
        }, 300);
    } else {
        showToast('❌ Clear operation cancelled.', 'info');
    }
}

// Enhanced toast notification system
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Toast styles
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getToastColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 500;
        max-width: 300px;
        word-wrap: break-word;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Get toast color based on type
function getToastColor(type) {
    const colors = {
        success: '#00b894',
        error: '#e74c3c',
        info: '#3498db',
        warning: '#f39c12'
    };
    return colors[type] || colors.info;
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
