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

// Update navigation based on auth state
function updateNavigation() {
    const navList = document.querySelector('nav ul');
    if (!navList) return;

    // Remove existing auth links
    navList.querySelectorAll('.auth-link').forEach(el => el.remove());

    const user = getCurrentUser();

    if (user) {
        if (user.isAdmin) {
            const adminItem = document.createElement('li');
            adminItem.classList.add('auth-link');
            adminItem.innerHTML = '<a href="admin.html" class="nav-link">Admin</a>';
            navList.appendChild(adminItem);
        }

        const logoutItem = document.createElement('li');
        logoutItem.classList.add('auth-link');
        const logoutLink = document.createElement('a');
        logoutLink.href = '#';
        logoutLink.className = 'nav-link';
        logoutLink.textContent = 'Logout';
        logoutLink.addEventListener('click', e => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            updateNavigation();
        });
        logoutItem.appendChild(logoutLink);
        navList.appendChild(logoutItem);
    } else {
        const loginItem = document.createElement('li');
        loginItem.classList.add('auth-link');
        loginItem.innerHTML = '<a href="login.html" class="nav-link">Login</a>';
        navList.appendChild(loginItem);
    }
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
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify({ email: user.email, isAdmin: user.isAdmin }));
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
        }
        users.push({ email, password, isAdmin: false });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful. Please log in.');
        window.location.href = 'login.html';
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

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    ensureAdminUser();
    updateNavigation();
    setupLoginForm();
    setupRegisterForm();
    protectAdminPage();
});

