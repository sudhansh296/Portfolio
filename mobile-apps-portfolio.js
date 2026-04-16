// Mobile Apps Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializeApp();
});

function initializeApp() {
    setupDownloadHandlers();
    setupShareHandlers();
    setupModalHandlers();
    setupAnimations();
    setupStatsCounter();
}

// Download Handlers
function setupDownloadHandlers() {
    const downloadBtns = document.querySelectorAll('.download-btn');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const appName = this.getAttribute('data-app');
            showDownloadModal(appName);
        });
    });
}

function showDownloadModal(appName) {
    const modal = document.getElementById('downloadModal');
    const modalTitle = modal.querySelector('.modal-header h3');
    const directDownloadBtn = modal.querySelector('#directDownload');
    
    // Update modal content based on app
    if (appName === 'musiqflow') {
        modalTitle.textContent = 'Download MusiqFlow';
        directDownloadBtn.onclick = () => downloadAPK('musiqflow');
    } else if (appName === 'musiqflow-lite') {
        modalTitle.textContent = 'Download MusiqFlow Lite';
        directDownloadBtn.onclick = () => downloadAPK('musiqflow-lite');
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function downloadAPK(appName) {
    // Show loading state
    const btn = document.querySelector('#directDownload');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    btn.disabled = true;
    
    // Simulate download process
    setTimeout(() => {
        // Create download link
        const downloadUrl = getDownloadUrl(appName);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${appName}.apk`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Reset button
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        // Close modal
        closeModal();
        
        // Show success message
        showNotification('Download started successfully!', 'success');
        
        // Track download
        trackDownload(appName);
    }, 2000);
}

function getDownloadUrl(appName) {
    // Updated download URLs for separate repositories
    const downloadUrls = {
        'musiqflow': 'https://github.com/sudhansh296/Portfolio/releases/download/v1.0.0/musiqflow.apk',
        'musiqflow-lite': 'https://github.com/sudhansh296/musiqflow-lite/releases/download/v1.0.0/musiqflow-lite.apk'
    };
    
    return downloadUrls[appName] || '#';
}

// Share Handlers
function setupShareHandlers() {
    const shareBtns = document.querySelectorAll('.share-btn');
    
    shareBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const appName = this.getAttribute('data-app');
            shareApp(appName);
        });
    });
}

function shareApp(appName) {
    const shareData = getShareData(appName);
    
    if (navigator.share) {
        // Use native Web Share API if available
        navigator.share(shareData)
            .then(() => {
                showNotification('Shared successfully!', 'success');
                trackShare(appName, 'native');
            })
            .catch(err => {
                console.log('Error sharing:', err);
                fallbackShare(shareData, appName);
            });
    } else {
        // Fallback to custom share modal
        fallbackShare(shareData, appName);
    }
}

function getShareData(appName) {
    const baseUrl = window.location.origin;
    const shareData = {
        'musiqflow': {
            title: 'MusiqFlow - Advanced Music Streaming Platform',
            text: 'Check out MusiqFlow, an amazing music streaming app with real-time lyrics and high-quality audio!',
            url: `${baseUrl}/mobile-apps#musiqflow`
        },
        'musiqflow-lite': {
            title: 'MusiqFlow Lite - Native Android Music Player',
            text: 'Experience MusiqFlow Lite, a native Android music player built with Kotlin and Jetpack Compose!',
            url: `${baseUrl}/mobile-apps#musiqflow-lite`
        }
    };
    
    return shareData[appName] || shareData['musiqflow'];
}

function fallbackShare(shareData, appName) {
    // Copy to clipboard
    const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText)
            .then(() => {
                showNotification('Share link copied to clipboard!', 'success');
                trackShare(appName, 'clipboard');
            })
            .catch(() => {
                showSocialShareModal(shareData, appName);
            });
    } else {
        showSocialShareModal(shareData, appName);
    }
}

function showSocialShareModal(shareData, appName) {
    // Create social share modal
    const modal = createSocialShareModal(shareData);
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Track share modal open
    trackShare(appName, 'modal');
}

function createSocialShareModal(shareData) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Share App</h3>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="share-options">
                    <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}" 
                       target="_blank" class="share-option twitter">
                        <i class="fab fa-twitter"></i>
                        <span>Twitter</span>
                    </a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}" 
                       target="_blank" class="share-option facebook">
                        <i class="fab fa-facebook"></i>
                        <span>Facebook</span>
                    </a>
                    <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}" 
                       target="_blank" class="share-option linkedin">
                        <i class="fab fa-linkedin"></i>
                        <span>LinkedIn</span>
                    </a>
                    <a href="https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}" 
                       target="_blank" class="share-option whatsapp">
                        <i class="fab fa-whatsapp"></i>
                        <span>WhatsApp</span>
                    </a>
                </div>
                <div class="share-link">
                    <input type="text" value="${shareData.url}" readonly>
                    <button class="btn btn-primary copy-link">Copy Link</button>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners
    const closeBtn = modal.querySelector('.close');
    const copyBtn = modal.querySelector('.copy-link');
    const linkInput = modal.querySelector('input');
    
    closeBtn.onclick = () => {
        modal.remove();
    };
    
    copyBtn.onclick = () => {
        linkInput.select();
        document.execCommand('copy');
        showNotification('Link copied to clipboard!', 'success');
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    };
    
    return modal;
}

// Modal Handlers
function setupModalHandlers() {
    const modal = document.getElementById('downloadModal');
    const closeBtn = modal.querySelector('.close');
    
    closeBtn.onclick = closeModal;
    
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };
    
    // ESC key to close modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('downloadModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Animations
function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe app cards
    document.querySelectorAll('.app-card').forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });
    
    // Observe stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        observer.observe(card);
    });
}

// Stats Counter Animation
function setupStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element) {
    const target = element.textContent;
    const isDecimal = target.includes('.');
    const numericTarget = parseFloat(target.replace(/[^\d.]/g, ''));
    const suffix = target.replace(/[\d.]/g, '');
    
    let current = 0;
    const increment = numericTarget / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericTarget) {
            current = numericTarget;
            clearInterval(timer);
        }
        
        const displayValue = isDecimal ? current.toFixed(1) : Math.floor(current);
        element.textContent = displayValue + suffix;
    }, 40);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 1rem;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Manual close
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.onclick = () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    };
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

// Analytics Tracking
function trackDownload(appName) {
    // In a real implementation, this would send data to analytics service
    console.log(`Download tracked: ${appName}`);
    
    // Example: Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'download', {
            'event_category': 'mobile_app',
            'event_label': appName,
            'value': 1
        });
    }
}

function trackShare(appName, method) {
    console.log(`Share tracked: ${appName} via ${method}`);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'share', {
            'event_category': 'mobile_app',
            'event_label': appName,
            'method': method
        });
    }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .share-options {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .share-option {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        text-decoration: none;
        color: white;
        font-weight: 500;
        transition: transform 0.2s ease;
    }
    
    .share-option:hover {
        transform: translateY(-2px);
    }
    
    .share-option.twitter { background: #1da1f2; }
    .share-option.facebook { background: #4267b2; }
    .share-option.linkedin { background: #0077b5; }
    .share-option.whatsapp { background: #25d366; }
    
    .share-link {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }
    
    .share-link input {
        flex: 1;
        padding: 0.5rem;
        border: 1px solid var(--border-color);
        border-radius: 5px;
        background: var(--dark-bg);
        color: var(--text-primary);
    }
`;
document.head.appendChild(style);