// Simple authentication system using localStorage

// Default admin credentials
const DEFAULT_ADMIN = {
    email: 'scottyvenable@gmail.com',
    password: 'SVen!8019',
    isAdmin: true
};

// Ensure admin user exists in localStorage
function ensureAdminUser() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const adminExists = users.some(u => u.email === DEFAULT_ADMIN.email);
    if (!adminExists) {
        users.push(DEFAULT_ADMIN);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Get current logged in user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

// Get user initials for profile picture
function getUserInitials(user) {
    if (user.displayName) {
        const names = user.displayName.trim().split(' ');
        if (names.length >= 2) {
            return (names[0][0] + names[names.length - 1][0]).toUpperCase();
        }
        return names[0][0].toUpperCase();
    }
    // Fall back to email
    return user.email[0].toUpperCase();
}

// Update navigation based on auth state
function updateNavigation() {
    const navList = document.querySelector('nav ul');
    if (!navList) return;

    // Remove existing auth links
    navList.querySelectorAll('.auth-link').forEach(el => el.remove());

    const user = getCurrentUser();

    // Handle
    const devControls = document.getElementById('admin-dev-controls');
    if (devControls) {
        if (user && user.isAdmin) {
            devControls.classList.add('show');
        } else {
            devControls.classList.remove('show');
        }
    }    // Create auth button container
    const authContainer = document.createElement('li');
    authContainer.classList.add('auth-link', 'auth-container');
      if (user) {
        // Create account section with profile picture and greeting
        const userName = user.displayName || user.email.split('@')[0];
        const userInitials = getUserInitials(user);
        const profilePicture = user.profilePicture || '';        authContainer.innerHTML = `
            <div class="nav-account-section">
                <a href="account.html" class="nav-profile-link" title="Go to Account">
                    <div class="nav-profile-picture" id="nav-profile-picture">
                        ${profilePicture ? `<img src="${profilePicture}" alt="Profile">` : `<span class="nav-profile-initials">${userInitials}</span>`}
                    </div>
                </a>
                <button class="nav-link logout-btn" onclick="logout()" title="Logout">Logout</button>
            </div>
        `;

        // Add admin link if user is admin
        if (user.isAdmin) {
            const adminItem = document.createElement('li');
            adminItem.classList.add('auth-link');
            adminItem.innerHTML = '<a href="admin.html" class="nav-link">Admin</a>';
            navList.appendChild(adminItem);
        }
    } else {
        // Create login button
        authContainer.innerHTML = '<a href="login.html" class="nav-link login-btn">Login</a>';
    }

    navList.appendChild(authContainer);
}

// Handle login form submission
function setupLoginForm() {
    const form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        const email = form.email.value.trim();
        const password = form.password.value;
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);        if (user) {
            // Store the complete user object (excluding password for security)
            const userSession = { 
                email: user.email, 
                isAdmin: user.isAdmin,
                displayName: user.displayName,
                profilePicture: user.profilePicture,
                profileColor: user.profileColor
            };
            localStorage.setItem('currentUser', JSON.stringify(userSession));
            if (user.isAdmin) {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'index.html';
            }
        } else {
            alert('Invalid credentials');
        }
    });
}

// Handle registration form submission
function setupRegisterForm() {
    const form = document.getElementById('register-form');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        const email = form.email.value.trim();
        const password = form.password.value;
        if (!email || !password) {
            alert('Please provide email and password');
            return;
        }
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(u => u.email === email)) {
            alert('User already exists');
            return;
        }        const newUser = { 
            email, 
            password, 
            isAdmin: false,
            displayName: '',
            profilePicture: '',
            profileColor: ''
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Auto-login the new user
        const userSession = { 
            email: newUser.email, 
            isAdmin: newUser.isAdmin,
            displayName: newUser.displayName,
            profilePicture: newUser.profilePicture,
            profileColor: newUser.profileColor
        };
        localStorage.setItem('currentUser', JSON.stringify(userSession));
        window.location.href = 'account.html'; // Direct to account to set up profile
    });
}

// Restrict admin page access
function protectAdminPage() {
    if (!document.body.classList.contains('admin-page')) return;
    const user = getCurrentUser();
    if (!user || !user.isAdmin) {
        window.location.href = 'login.html';
    }
}

// Handle logout
function logout() {
    // Clear user session
    localStorage.removeItem('currentUser');
    
    // Show logout popup
    showLogoutPopup();
}

// Logout popup functionality
function showLogoutPopup() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'logout-popup-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    
    // Create popup
    const popup = document.createElement('div');
    popup.className = 'logout-popup';
    popup.setAttribute('role', 'dialog');
    popup.setAttribute('aria-labelledby', 'logout-title');
    popup.setAttribute('aria-describedby', 'logout-description');
    popup.innerHTML = `
        <h3 id="logout-title">Logged Out Successfully</h3>
        <p id="logout-description">You have been logged out of your account.</p>
        <button class="button" onclick="closeLogoutPopup()" aria-label="Close logout notification">OK</button>
    `;
    
    // Add to DOM
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
    
    // Focus management for accessibility
    const closeButton = popup.querySelector('button');
    if (closeButton) {
        closeButton.focus();
    }
    
    // Show with animation
    setTimeout(() => {
        overlay.classList.add('show');
        popup.classList.add('show');
    }, 10);
    
    // Perform logout
    localStorage.removeItem('currentUser');
    updateNavigation();
    
    // Store popup references for cleanup
    window.currentLogoutOverlay = overlay;
    window.currentLogoutPopup = popup;
}

function closeLogoutPopup() {
    const overlay = window.currentLogoutOverlay;
    const popup = window.currentLogoutPopup;
    
    if (overlay && popup) {
        overlay.classList.remove('show');
        popup.classList.remove('show');
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            if (popup.parentNode) popup.parentNode.removeChild(popup);
            window.currentLogoutOverlay = null;
            window.currentLogoutPopup = null;
            
            // Return focus to the body or last focused element
            document.body.focus();
        }, 300);
    }
}

// Close popup when clicking on overlay
document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('logout-popup-overlay')) {
        closeLogoutPopup();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.currentLogoutPopup) {
        closeLogoutPopup();
    }
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    ensureAdminUser();
    updateNavigation();
    setupLoginForm();
    setupRegisterForm();
    protectAdminPage();
});

