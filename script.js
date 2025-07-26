// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initRouteePlanner();
    initVehicleTabs();
    initAnimations();
    initFormHandlers();
    initCheckboxes();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Route planner functionality
function initRouteePlanner() {
    const plannerForm = document.querySelector('.planner-form');
    
    if (plannerForm) {
        plannerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const fromLocation = document.getElementById('from-location').value;
            const toLocation = document.getElementById('to-location').value;
            const tripDays = document.getElementById('trip-days').value;
            const vehicleType = document.getElementById('vehicle-type').value;
            
            // Validate form
            if (!fromLocation || !toLocation) {
                showNotification('Please enter both source and destination', 'error');
                return;
            }
            
            if (!tripDays || tripDays < 1) {
                showNotification('Please enter a valid number of days', 'error');
                return;
            }
            
            // Simulate route planning
            showNotification('Planning your route...', 'info');
            
            setTimeout(() => {
                showRouteResults({
                    from: fromLocation,
                    to: toLocation,
                    days: tripDays,
                    vehicle: vehicleType
                });
            }, 2000);
        });
    }
}

// Show route planning results
function showRouteResults(data) {
    const resultsHTML = `
        <div class="route-results">
            <h3>🗺️ Your Optimized Route: ${data.from} → ${data.to}</h3>
            <div class="route-summary">
                <div class="summary-item">
                    <i class="fas fa-clock"></i>
                    <span>Duration: ${data.days} days</span>
                </div>
                <div class="summary-item">
                    <i class="fas fa-car"></i>
                    <span>Vehicle: ${data.vehicle || 'Not specified'}</span>
                </div>
                <div class="summary-item">
                    <i class="fas fa-map-marked-alt"></i>
                    <span>Hidden spots: 12 discovered</span>
                </div>
                <div class="summary-item">
                    <i class="fas fa-rupee-sign"></i>
                    <span>Estimated cost: ₹8,500</span>
                </div>
            </div>
            <div class="suggested-route">
                <h4>🎯 Suggested Itinerary</h4>
                <div class="day-plan">
                    <div class="day">
                        <h5>Day 1: ${data.from} → Moradabad → Rampur</h5>
                        <ul>
                            <li>🌅 Start early from ${data.from} (6:00 AM)</li>
                            <li>🍽️ Breakfast at famous Paranthe Wali Gali (if from Delhi)</li>
                            <li>⛽ Fuel stop at Ghaziabad (EV charging available)</li>
                            <li>🏛️ Hidden gem: Ancient Jama Masjid, Moradabad</li>
                            <li>🍜 Lunch at local dhaba - Sharma Dhaba (₹150/person)</li>
                            <li>🌄 Evening: Rampur Raza Library (hidden architectural marvel)</li>
                            <li>🏨 Stay: Budget hotel in Rampur (₹1,200/night)</li>
                        </ul>
                    </div>
                    <div class="day">
                        <h5>Day 2: Rampur → Haldwani → ${data.to}</h5>
                        <ul>
                            <li>🌅 Early start (7:00 AM)</li>
                            <li>🏔️ Hidden viewpoint: Kaladhungi (Jim Corbett's home)</li>
                            <li>🦌 Quick safari option at Corbett (if time permits)</li>
                            <li>🍽️ Lunch at Haldwani local market</li>
                            <li>🚗 Scenic drive through Kumaon hills</li>
                            <li>🌊 Arrive ${data.to} by evening</li>
                            <li>🌅 Sunset at Naini Lake</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="local-tips">
                <h4>💡 Local Insider Tips</h4>
                <div class="tips-grid">
                    <div class="tip">
                        <i class="fas fa-eye"></i>
                        <p><strong>Hidden Waterfall:</strong> 2km off Bhimtal road, near old temple</p>
                    </div>
                    <div class="tip">
                        <i class="fas fa-utensils"></i>
                        <p><strong>Best Momos:</strong> Tibetan Market, Mall Road (₹50/plate)</p>
                    </div>
                    <div class="tip">
                        <i class="fas fa-camera"></i>
                        <p><strong>Photography:</strong> Early morning at Tiffin Top for best shots</p>
                    </div>
                    <div class="tip">
                        <i class="fas fa-rupee-sign"></i>
                        <p><strong>Budget Hack:</strong> Stay in Tallital for cheaper accommodation</p>
                    </div>
                </div>
            </div>
            <div class="action-buttons">
                <button class="btn-primary" onclick="downloadItinerary()">📱 Download Itinerary</button>
                <button class="btn-secondary" onclick="shareRoute()">📤 Share Route</button>
                <button class="btn-secondary" onclick="modifyRoute()">✏️ Modify Route</button>
            </div>
        </div>
    `;
    
    // Create modal or insert results
    showModal('Route Planning Results', resultsHTML);
}

// Vehicle preparation tabs
function initVehicleTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const targetPane = document.getElementById(targetTab + '-tab');
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.route-card, .destination-card, .insight-card, .category-card, .station-card');
    animateElements.forEach(el => observer.observe(el));
}

// Form handlers
function initFormHandlers() {
    // Contribute button
    const contributeBtn = document.querySelector('.contribute-btn');
    if (contributeBtn) {
        contributeBtn.addEventListener('click', () => {
            showContributeModal();
        });
    }
    
    // Filter checkboxes for EV stations
    const filterCheckboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            filterEVStations();
        });
    });
}

// Checkbox functionality for vehicle preparation
function initCheckboxes() {
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const listItem = e.target.closest('li');
            if (e.target.checked) {
                listItem.style.opacity = '0.6';
                listItem.style.textDecoration = 'line-through';
            } else {
                listItem.style.opacity = '1';
                listItem.style.textDecoration = 'none';
            }
            
            // Save progress to localStorage
            saveChecklistProgress();
        });
    });
    
    // Load saved progress
    loadChecklistProgress();
}

// Save checklist progress
function saveChecklistProgress() {
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    const progress = {};
    
    checkboxes.forEach((checkbox, index) => {
        progress[index] = checkbox.checked;
    });
    
    localStorage.setItem('checklistProgress', JSON.stringify(progress));
}

// Load checklist progress
function loadChecklistProgress() {
    const saved = localStorage.getItem('checklistProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
        
        checkboxes.forEach((checkbox, index) => {
            if (progress[index]) {
                checkbox.checked = true;
                const listItem = checkbox.closest('li');
                listItem.style.opacity = '0.6';
                listItem.style.textDecoration = 'line-through';
            }
        });
    }
}

// Show contribute modal
function showContributeModal() {
    const modalHTML = `
        <div class="contribute-form">
            <h3>🌟 Share Your Local Knowledge</h3>
            <form id="contribute-form">
                <div class="form-group">
                    <label>Type of Contribution</label>
                    <select required>
                        <option value="">Select type</option>
                        <option value="hidden-spot">Hidden Spot (50 points)</option>
                        <option value="review">Detailed Review (25 points)</option>
                        <option value="photo">Photo Upload (15 points)</option>
                        <option value="tip">Travel Tip (10 points)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" placeholder="e.g., Near Bhimtal Lake" required>
                </div>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" placeholder="e.g., Secret Waterfall with Amazing Views" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea rows="4" placeholder="Share detailed information about this place..." required></textarea>
                </div>
                <div class="form-group">
                    <label>Cost Information</label>
                    <input type="text" placeholder="e.g., Free entry, ₹50 parking">
                </div>
                <div class="form-group">
                    <label>Best Time to Visit</label>
                    <input type="text" placeholder="e.g., Early morning, Monsoon season">
                </div>
                <div class="form-group">
                    <label>Tags</label>
                    <input type="text" placeholder="e.g., photography, free, nature, adventure">
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Submit & Earn Points</button>
                    <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                </div>
            </form>
        </div>
    `;
    
    showModal('Contribute to Community', modalHTML);
    
    // Handle form submission
    document.getElementById('contribute-form').addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Thank you! Your contribution is being reviewed. You\'ll earn points once approved!', 'success');
        closeModal();
    });
}

// Filter EV stations
function filterEVStations() {
    const speedFilters = document.querySelectorAll('input[type="checkbox"]');
    const stationCards = document.querySelectorAll('.station-card');
    
    // This is a simplified filter - in a real app, you'd filter based on actual data
    showNotification('Filters applied! Showing relevant charging stations.', 'info');
}

// Utility functions
function showModal(title, content) {
    // Remove existing modal
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modalHTML = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="modal-close" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
    
    // Add modal styles if not already present
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = `
            <style id="modal-styles">
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                }
                
                .modal-content {
                    background: white;
                    border-radius: 15px;
                    max-width: 90vw;
                    max-height: 90vh;
                    overflow-y: auto;
                    animation: slideUp 0.3s ease;
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem 2rem;
                    border-bottom: 1px solid #ecf0f1;
                }
                
                .modal-header h2 {
                    margin: 0;
                    color: #2c3e50;
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: #7f8c8d;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal-close:hover {
                    color: #e74c3c;
                }
                
                .modal-body {
                    padding: 2rem;
                }
                
                .route-results {
                    max-width: 800px;
                }
                
                .route-summary {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin: 1.5rem 0;
                }
                
                .summary-item {
                    background: #f8f9fa;
                    padding: 1rem;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .summary-item i {
                    color: #e74c3c;
                }
                
                .suggested-route {
                    margin: 2rem 0;
                }
                
                .day {
                    background: #f8f9fa;
                    padding: 1.5rem;
                    border-radius: 10px;
                    margin-bottom: 1rem;
                }
                
                .day h5 {
                    color: #2c3e50;
                    margin-bottom: 1rem;
                    font-size: 1.1rem;
                }
                
                .day ul {
                    list-style: none;
                    padding: 0;
                }
                
                .day li {
                    padding: 0.3rem 0;
                    color: #2c3e50;
                }
                
                .local-tips {
                    margin: 2rem 0;
                }
                
                .tips-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .tip {
                    background: #fff5f5;
                    padding: 1rem;
                    border-radius: 10px;
                    border-left: 3px solid #e74c3c;
                }
                
                .tip i {
                    color: #e74c3c;
                    margin-bottom: 0.5rem;
                }
                
                .action-buttons {
                    display: flex;
                    gap: 1rem;
                    margin-top: 2rem;
                    flex-wrap: wrap;
                }
                
                .btn-primary, .btn-secondary {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                
                .btn-primary {
                    background: #e74c3c;
                    color: white;
                }
                
                .btn-primary:hover {
                    background: #c0392b;
                }
                
                .btn-secondary {
                    background: #ecf0f1;
                    color: #2c3e50;
                }
                
                .btn-secondary:hover {
                    background: #bdc3c7;
                }
                
                .contribute-form .form-group {
                    margin-bottom: 1.5rem;
                }
                
                .contribute-form label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                    color: #2c3e50;
                }
                
                .contribute-form input,
                .contribute-form select,
                .contribute-form textarea {
                    width: 100%;
                    padding: 10px;
                    border: 2px solid #ecf0f1;
                    border-radius: 8px;
                    font-size: 1rem;
                    transition: border-color 0.3s ease;
                }
                
                .contribute-form input:focus,
                .contribute-form select:focus,
                .contribute-form textarea:focus {
                    outline: none;
                    border-color: #e74c3c;
                }
                
                .form-actions {
                    display: flex;
                    gap: 1rem;
                    margin-top: 2rem;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @media (max-width: 768px) {
                    .modal-content {
                        max-width: 95vw;
                        margin: 1rem;
                    }
                    
                    .modal-header,
                    .modal-body {
                        padding: 1rem;
                    }
                    
                    .route-summary {
                        grid-template-columns: 1fr;
                    }
                    
                    .tips-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .action-buttons {
                        flex-direction: column;
                    }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', modalStyles);
    }
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const notificationStyles = `
            <style id="notification-styles">
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    z-index: 10001;
                    min-width: 300px;
                    max-width: 500px;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    animation: slideInRight 0.3s ease;
                }
                
                .notification-content {
                    padding: 1rem 1.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: white;
                }
                
                .notification-content button {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                    padding: 0;
                    margin-left: 1rem;
                }
                
                .notification-info {
                    background: #3498db;
                }
                
                .notification-success {
                    background: #27ae60;
                }
                
                .notification-error {
                    background: #e74c3c;
                }
                
                .notification-warning {
                    background: #f39c12;
                }
                
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @media (max-width: 768px) {
                    .notification {
                        right: 10px;
                        left: 10px;
                        min-width: auto;
                    }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', notificationStyles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Action button functions
function downloadItinerary() {
    showNotification('Itinerary downloaded! Check your downloads folder.', 'success');
}

function shareRoute() {
    if (navigator.share) {
        navigator.share({
            title: 'My Hidden Route Plan',
            text: 'Check out this amazing travel route I planned!',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Route link copied to clipboard!', 'success');
        });
    }
}

function modifyRoute() {
    closeModal();
    document.querySelector('#from-location').focus();
    showNotification('Modify your route details and search again.', 'info');
}

// Search functionality (for future implementation)
function searchDestinations(query) {
    // This would connect to a real search API
    console.log('Searching for:', query);
}

// Geolocation for current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                // Use reverse geocoding to get location name
                showNotification('Current location detected!', 'success');
            },
            (error) => {
                showNotification('Unable to get your location. Please enter manually.', 'warning');
            }
        );
    }
}

// Initialize tooltips and help text
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        element.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initTooltips();
    initLazyLoading();
});