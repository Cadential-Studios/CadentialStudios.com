// Account management system
class AccountManager {
    constructor() {
        this.userKey = 'currentUser';
        this.usersKey = 'users';
        this.init();
    }

    init() {
        // Check if user is logged in
        this.checkAccess();
        // Load user data
        this.loadUserData();
        // Setup event listeners
        this.setupEventListeners();
        // Generate profile picture
        this.updateProfilePicture();
    }

    checkAccess() {
        const user = this.getCurrentUser();
        if (!user) {
            alert('Please log in to access your account.');
            window.location.href = 'login.html';
            return;
        }
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem(this.userKey) || 'null');
    }

    getAllUsers() {
        return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    }

    updateUser(userData) {
        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.email === userData.email);
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...userData };
            localStorage.setItem(this.usersKey, JSON.stringify(users));
            localStorage.setItem(this.userKey, JSON.stringify(users[userIndex]));
        }
    }

    loadUserData() {
        const user = this.getCurrentUser();
        if (!user) return;

        // Load basic info
        document.getElementById('display-name').value = user.displayName || user.email.split('@')[0];
        document.getElementById('email-display').value = user.email;
        document.getElementById('bio').value = user.bio || '';

        // Load interests
        const interests = user.interests || [];
        document.querySelectorAll('input[name="interests"]').forEach(checkbox => {
            checkbox.checked = interests.includes(checkbox.value);
        });

        // Load settings
        document.getElementById('email-notifications').checked = user.emailNotifications !== false;
        document.getElementById('profile-public').checked = user.profilePublic || false;

        // Load social connections
        this.updateSocialStatus('twitter', user.socialConnections?.twitter);
        this.updateSocialStatus('instagram', user.socialConnections?.instagram);
        this.updateSocialStatus('linkedin', user.socialConnections?.linkedin);
    }

    updateSocialStatus(platform, connection) {
        const statusElement = document.getElementById(`${platform}-status`);
        const buttonElement = document.getElementById(`connect-${platform}`);
        
        if (connection) {
            statusElement.textContent = `Connected as ${connection}`;
            buttonElement.textContent = 'Disconnect';
            buttonElement.classList.add('connected');
        } else {
            statusElement.textContent = 'Not connected';
            buttonElement.textContent = 'Connect';
            buttonElement.classList.remove('connected');
        }
    }

    generateProfileColor() {
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
            '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    updateProfilePicture() {
        const user = this.getCurrentUser();
        if (!user) return;

        const profilePicture = document.getElementById('profile-picture');
        const profileInitials = document.getElementById('profile-initials');
        
        if (user.profilePicture) {
            profilePicture.style.backgroundImage = `url(${user.profilePicture})`;
            profilePicture.style.backgroundColor = 'transparent';
            profileInitials.style.display = 'none';
        } else {
            const name = user.displayName || user.email.split('@')[0];
            const initials = name.substring(0, 1).toUpperCase();
            const color = user.profileColor || this.generateProfileColor();
            
            // Save color if it's new
            if (!user.profileColor) {
                this.updateUser({ profileColor: color });
            }
            
            profilePicture.style.backgroundImage = 'none';
            profilePicture.style.backgroundColor = color;
            profileInitials.textContent = initials;
            profileInitials.style.display = 'flex';
        }
    }

    setupEventListeners() {
        // Profile picture change
        document.getElementById('change-picture-btn').addEventListener('click', () => {
            document.getElementById('picture-upload').click();
        });

        document.getElementById('picture-upload').addEventListener('change', (e) => {
            this.handlePictureUpload(e);
        });

        // Save profile changes
        document.getElementById('save-profile-btn').addEventListener('click', () => {
            this.saveProfile();
        });

        // Cancel changes
        document.getElementById('cancel-changes-btn').addEventListener('click', () => {
            this.loadUserData();
        });

        // Password change
        document.getElementById('change-password-btn').addEventListener('click', () => {
            this.showPasswordModal();
        });

        // Password modal
        document.getElementById('password-change-form').addEventListener('submit', (e) => {
            this.handlePasswordChange(e);
        });

        document.getElementById('cancel-password').addEventListener('click', () => {
            this.hidePasswordModal();
        });

        document.querySelector('.close').addEventListener('click', () => {
            this.hidePasswordModal();
        });

        // Social connections
        document.getElementById('connect-twitter').addEventListener('click', () => {
            this.toggleSocialConnection('twitter');
        });

        document.getElementById('connect-instagram').addEventListener('click', () => {
            this.toggleSocialConnection('instagram');
        });

        document.getElementById('connect-linkedin').addEventListener('click', () => {
            this.toggleSocialConnection('linkedin');
        });        // Account actions
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.logout();
        });

        document.getElementById('export-data-btn').addEventListener('click', () => {
            this.exportUserData();
        });

        document.getElementById('delete-account-btn').addEventListener('click', () => {
            this.deleteAccount();
        });

        // Settings toggles
        document.getElementById('email-notifications').addEventListener('change', (e) => {
            this.updateUser({ emailNotifications: e.target.checked });
        });

        document.getElementById('profile-public').addEventListener('change', (e) => {
            this.updateUser({ profilePublic: e.target.checked });
        });
    }

    handlePictureUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) { // 2MB limit
            alert('File size must be less than 2MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;
            this.updateUser({ profilePicture: imageData });
            this.updateProfilePicture();
        };
        reader.readAsDataURL(file);
    }

    saveProfile() {
        const displayName = document.getElementById('display-name').value.trim();
        const bio = document.getElementById('bio').value.trim();
        
        // Get selected interests
        const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
            .map(checkbox => checkbox.value);

        this.updateUser({
            displayName: displayName,
            bio: bio,
            interests: interests
        });

        this.showFeedback('Profile updated successfully!', 'success');
        this.updateProfilePicture(); // Refresh in case name changed
    }

    showPasswordModal() {
        document.getElementById('password-modal').style.display = 'block';
    }

    hidePasswordModal() {
        document.getElementById('password-modal').style.display = 'none';
        document.getElementById('password-change-form').reset();
    }

    handlePasswordChange(event) {
        event.preventDefault();
        
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        const user = this.getCurrentUser();
        const users = this.getAllUsers();
        const fullUser = users.find(u => u.email === user.email);
        
        if (fullUser.password !== currentPassword) {
            alert('Current password is incorrect');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match');
            return;
        }
        
        if (newPassword.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }
        
        this.updateUser({ password: newPassword });
        this.hidePasswordModal();
        this.showFeedback('Password updated successfully!', 'success');
    }

    toggleSocialConnection(platform) {
        const button = document.getElementById(`connect-${platform}`);
        const user = this.getCurrentUser();
        const socialConnections = user.socialConnections || {};
        
        if (socialConnections[platform]) {
            // Disconnect
            delete socialConnections[platform];
            this.updateUser({ socialConnections });
            this.updateSocialStatus(platform, null);
        } else {
            // Connect - simulate connection
            const username = prompt(`Enter your ${platform} username:`);
            if (username) {
                socialConnections[platform] = username;
                this.updateUser({ socialConnections });
                this.updateSocialStatus(platform, username);
            }
        }
    }

    exportUserData() {
        const user = this.getCurrentUser();
        const userData = {
            exportDate: new Date().toISOString(),
            email: user.email,
            displayName: user.displayName,
            bio: user.bio,
            interests: user.interests,
            socialConnections: user.socialConnections,
            settings: {
                emailNotifications: user.emailNotifications,
                profilePublic: user.profilePublic
            }
        };
        
        const dataStr = JSON.stringify(userData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `cadential-account-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    deleteAccount() {
        const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
        if (!confirmed) return;
        
        const secondConfirm = confirm('This will permanently delete all your data. Are you absolutely sure?');
        if (!secondConfirm) return;
        
        const user = this.getCurrentUser();
        const users = this.getAllUsers().filter(u => u.email !== user.email);
        
        localStorage.setItem(this.usersKey, JSON.stringify(users));
        localStorage.removeItem(this.userKey);
        
        alert('Your account has been deleted. You will be redirected to the homepage.');
        window.location.href = 'index.html';
    }

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            // Clear user session
            localStorage.removeItem('currentUser');
            
            // Show logout popup (using the existing function from auth.js)
            if (typeof showLogoutPopup === 'function') {
                showLogoutPopup();
            } else {
                // Fallback if showLogoutPopup is not available
                alert('You have been logged out successfully.');
                window.location.href = 'index.html';
            }
        }
    }

    showFeedback(message, type = 'success') {
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = `account-feedback ${type}`;
        feedback.textContent = message;
        
        document.body.appendChild(feedback);
        
        // Show with animation
        setTimeout(() => feedback.classList.add('show'), 10);
        
        // Hide after 3 seconds
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => feedback.remove(), 300);
        }, 3000);
    }
}

// Initialize account manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AccountManager();
});
