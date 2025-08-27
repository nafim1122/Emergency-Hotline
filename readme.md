# Emergency Hotline - জরুরি হটলাইন

A responsive web application providing quick access to emergency services in Bangladesh with interactive features for calling, copying numbers, and maintaining call history.

## � Live Demo

[Live Demo Link] (Replace with your actual live link)

## 📱 Features

### Core Features (50 Marks)
- **Responsive Navbar** with logo, heart count, coin count, and copy count
- **Hero Section** with gradient background and emergency branding
- **Emergency Service Cards** displaying 6+ essential services
- **Call History Section** tracking all emergency calls
- **Fully Responsive** design for mobile devices

### Interactive Features
- **Heart System**: Click heart icons to increase favorite count
- **Call System**: Make emergency calls (costs 20 coins each)
- **Copy System**: Copy hotline numbers to clipboard
- **History Management**: Track and clear call history with timestamps

### Challenge Features (10 Marks)
- **Smart Copy Function**: Copy numbers to clipboard with feedback
- **Real-time Timestamps**: Display exact call times in history
- **Coin Management**: Prevent calls when insufficient coins

## 🛠️ Technology Stack

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with Flexbox/Grid, animations, and responsive design
- **Vanilla JavaScript**: Interactive functionality without frameworks
- **Font Awesome**: Icons for better UX

## 📋 Emergency Services Included

1. **National Emergency Service** (999) - জাতীয় জরুরি সেবা
2. **Police** (100) - পুলিশ
3. **Fire Service** (101) - ফায়ার সার্ভিস
4. **Ambulance Service** (102) - অ্যাম্বুলেন্স সেবা
5. **Railway Police** (1717) - রেলওয়ে পুলিশ
6. **BRAC Emergency** (16263) - ব্র্যাক জরুরি সেবা

## 🎯 How to Use

### 🔍 **Browse Services**
**View all emergency services in the main section**
- 📱 9 emergency services with visual cards and icons
- 🎨 Responsive layout: 3-column (desktop), 2-column (tablet), 1-column (mobile)
- 🔤 Service names in both Bengali and English

### ❤️ **Add to Favorites** 
**Click the heart icon on any service card**
- 💖 Heart icon located in top-right corner of each card
- ✨ Beautiful heartbeat animation with particle effects
- 🔢 Heart counter updates in navigation bar
- 🔄 Click again to toggle unlike

### 📋 **Copy Numbers**
**Click "Copy" button to copy hotline number to clipboard**
- 📱 Blue copy button on each service card
- 📋 Automatic clipboard integration with success feedback
- ✅ Green toast notification confirms successful copy
- 🔢 Copy counter tracks total operations

### 📞 **Make Calls**
**Click "Call" button to simulate emergency calls (requires 20 coins)**
- 🟢 Green call button with phone icon
- 🪙 Each call costs 20 coins (starts with 100 coins)
- 💰 Automatic balance check prevents insufficient coin calls
- ⏰ Real-time timestamp records exact call time
- 💸 Coin balance updates immediately

### 📚 **View History**
**Check call history in the right sidebar**
- 📖 Comprehensive call history panel
- 🕐 Real-time timestamps for each emergency call
- 📞 Service name and number details displayed
- 📊 Chronological order (most recent first)
- 📱 Responsive sidebar for all screen sizes

### 🗑️ **Clear History**
**Remove all call records with the clear button**
- 🧹 "Clear History" button at top of history panel
- 🔄 Instant clearing and panel update
- 🆕 Fresh start for new tracking session

## 📚 Technical Questions & Answers

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

**getElementById**: Returns a single element with the specified ID. It's the fastest method for selecting elements as IDs should be unique. Returns null if no element is found.

```javascript
const element = document.getElementById('myId'); // Returns single element or null
```

**getElementsByClassName**: Returns a live HTMLCollection of all elements with the specified class name. The collection automatically updates when DOM changes. Returns empty collection if no elements found.

```javascript
const elements = document.getElementsByClassName('myClass'); // Returns HTMLCollection
```

**querySelector**: Returns the first element that matches the specified CSS selector. More flexible as it accepts any CSS selector. Returns null if no match found.

```javascript
const element = document.querySelector('.myClass'); // Returns first match or null
```

**querySelectorAll**: Returns a static NodeList of all elements matching the CSS selector. The list doesn't update automatically when DOM changes.

```javascript
const elements = document.querySelectorAll('.myClass'); // Returns NodeList
```

### 2. How do you create and insert a new element into the DOM?

Creating and inserting elements involves these steps:

```javascript
// Step 1: Create the element
const newDiv = document.createElement('div');

// Step 2: Set attributes and content
newDiv.className = 'my-class';
newDiv.textContent = 'Hello World';
newDiv.setAttribute('data-id', '123');

// Step 3: Insert into DOM using various methods
const parent = document.getElementById('container');

// Append as last child
parent.appendChild(newDiv);

// Insert as first child
parent.insertBefore(newDiv, parent.firstChild);

// Insert using modern methods
parent.append(newDiv); // Can insert text and multiple elements
parent.prepend(newDiv); // Insert at beginning
parent.insertAdjacentElement('beforeend', newDiv); // More flexible positioning
```

### 3. What is Event Bubbling and how does it work?

Event Bubbling is a mechanism where events triggered on a child element automatically propagate up through its parent elements to the document root. When an event occurs on an element, it first runs on that element, then bubbles up through its ancestors.

```javascript
// HTML: <div id="parent"><button id="child">Click me</button></div>

document.getElementById('parent').addEventListener('click', () => {
    console.log('Parent clicked'); // This will run second
});

document.getElementById('child').addEventListener('click', () => {
    console.log('Child clicked'); // This runs first
});

// When button is clicked, output:
// "Child clicked"
// "Parent clicked"
```

The event flows in this order: target element → parent → grandparent → document → window

### 4. What is Event Delegation in JavaScript? Why is it useful?

Event Delegation is a technique where you attach a single event listener to a parent element instead of adding listeners to multiple child elements. The parent listens for events that bubble up from its children.

```javascript
// Instead of adding listeners to each button
document.querySelectorAll('.button').forEach(btn => {
    btn.addEventListener('click', handleClick); // Multiple listeners
});

// Use delegation - single listener on parent
document.getElementById('container').addEventListener('click', (e) => {
    if (e.target.classList.contains('button')) {
        handleClick(e); // Handle all button clicks
    }
});
```

**Benefits:**
- **Performance**: Fewer event listeners in memory
- **Dynamic Content**: Works with elements added after page load
- **Memory Management**: Prevents memory leaks from orphaned listeners
- **Cleaner Code**: Single handler instead of multiple identical ones

### 5. What is the difference between preventDefault() and stopPropagation() methods?

**preventDefault()**: Prevents the default browser behavior for an event but allows the event to continue bubbling.

```javascript
document.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault(); // Prevents link navigation
    console.log('Link clicked but won\'t navigate');
    // Event still bubbles to parent elements
});
```

**stopPropagation()**: Stops the event from bubbling to parent elements but doesn't prevent default behavior.

```javascript
document.querySelector('button').addEventListener('click', (e) => {
    e.stopPropagation(); // Stops bubbling
    console.log('Button clicked');
    // Default behavior still occurs, but parent won't receive event
});
```

**Key Differences:**
- `preventDefault()`: Controls **what** happens (default behavior)
- `stopPropagation()`: Controls **where** the event goes (bubbling)
- `stopImmediatePropagation()`: Stops both bubbling AND other listeners on same element
- You can use both together: `e.preventDefault(); e.stopPropagation();`

## 📁 Project Structure

```
Emergency-Hotline/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
└── assets/             # Images and icons
    ├── ambulance.png
    ├── Bangladesh-Railway.png
    ├── brac.png
    ├── coin.png
    ├── emergency.png
    ├── fire-service.png
    ├── heart.png
    ├── logo-dark.png
    ├── logo.png
    └── police.png
```

## 🎨 Design Features

- **Gradient Backgrounds**: Modern visual appeal
- **Card-based Layout**: Clean service presentation
- **Responsive Grid**: Adapts to all screen sizes
- **Smooth Animations**: Enhanced user interactions
- **Accessibility**: Keyboard navigation support
- **Visual Feedback**: Button animations and state changes

## � Setup Instructions

1. Clone the repository
2. Open `index.html` in a modern web browser
3. No additional setup required - pure vanilla JavaScript!

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (3-column card grid)
- **Tablet**: 768px-1199px (2-column card grid)
- **Mobile**: Below 768px (single column layout)
- **Small Mobile**: Below 480px (optimized for small screens)

## ⚡ Performance Features

- **Optimized Images**: Compressed assets for faster loading
- **Minimal Dependencies**: Only Font Awesome for icons
- **Efficient DOM Manipulation**: Event delegation and minimal reflows
- **CSS Animations**: Hardware-accelerated transforms

## � Security Considerations

- **Input Validation**: Safe handling of user interactions
- **XSS Prevention**: Proper content sanitization
- **No External Scripts**: Secure vanilla JavaScript implementation

## 🤝 Contributing

This is an academic project. Feel free to fork and enhance with additional features!

## � License

This project is created for educational purposes as part of Programming Hero Assignment-005.

---

**Developed with ❤️ for emergency response awareness**
