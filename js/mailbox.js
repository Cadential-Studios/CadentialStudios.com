// Mailbox System for Contact Form Messages
// Handles form submissions and stores messages for admin viewing

class MailboxSystem {
    constructor() {
        this.storageKey = 'cadential_mailbox';
        this.init();
    }

    init() {
        // Setup contact form handler
        this.setupContactForm();
        // Setup admin mailbox if on admin page
        this.setupAdminMailbox();
    }

    // Generate unique ID for messages
    generateMessageId() {
        return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Get all messages from localStorage
    getMessages() {
        const messages = localStorage.getItem(this.storageKey);
        return messages ? JSON.parse(messages) : [];
    }

    // Save message to localStorage
    saveMessage(messageData) {
        const messages = this.getMessages();
        const newMessage = {
            id: this.generateMessageId(),
            ...messageData,
            timestamp: new Date().toISOString(),
            isRead: false,
            isStarred: false
        };        messages.unshift(newMessage); // Add to beginning of array
        localStorage.setItem(this.storageKey, JSON.stringify(messages));
        this.updateAdminStats();
        return newMessage;
    }    // Mark message as read
    markAsRead(messageId) {
        const messages = this.getMessages();
        const message = messages.find(msg => msg.id === messageId);
        if (message) {            message.isRead = true;
            localStorage.setItem(this.storageKey, JSON.stringify(messages));
            this.renderMailbox(); // Re-render to show changes
            this.updateAdminStats();
        }
    }    // Toggle star status
    toggleStar(messageId, buttonElement = null) {
        this.showActionFeedback(buttonElement, 'star');
        
        const messages = this.getMessages();
        const message = messages.find(msg => msg.id === messageId);        if (message) {
            message.isStarred = !message.isStarred;
            localStorage.setItem(this.storageKey, JSON.stringify(messages));
            
            // Small delay to show feedback before re-render
            setTimeout(() => {
                this.renderMailbox(); // Re-render to show changes
                this.updateAdminStats();
            }, 150);
        }
    }

    // Delete message
    deleteMessage(messageId, buttonElement = null) {
        if (confirm('Are you sure you want to delete this message?')) {
            this.showActionFeedback(buttonElement, 'delete');
            
            const messages = this.getMessages();
            const filteredMessages = messages.filter(msg => msg.id !== messageId);
            localStorage.setItem(this.storageKey, JSON.stringify(filteredMessages));
              // Small delay to show feedback before re-render
            setTimeout(() => {
                this.renderMailbox(); // Re-render to show changes
                this.updateAdminStats();
            }, 150);
        }
    }

    // Setup contact form submission handler
    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const messageData = {
                name: formData.get('name').trim(),
                email: formData.get('email').trim(),
                subject: formData.get('subject').trim(),
                message: formData.get('message').trim()
            };

            // Validate data
            if (!messageData.name || !messageData.email || !messageData.subject || !messageData.message) {
                this.showFeedback('Please fill in all fields.', 'error');
                return;
            }

            // Save message
            try {
                this.saveMessage(messageData);
                this.showFeedback('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
            } catch (error) {
                console.error('Error saving message:', error);
                this.showFeedback('Error sending message. Please try again.', 'error');
            }
        });
    }

    // Show feedback message
    showFeedback(message, type = 'success') {
        const feedbackDiv = document.getElementById('form-feedback');
        const feedbackMessage = document.getElementById('feedback-message');
        
        if (feedbackDiv && feedbackMessage) {
            feedbackMessage.textContent = message;
            feedbackDiv.className = `form-feedback ${type}`;
            feedbackDiv.style.display = 'block';
            
            // Hide after 5 seconds
            setTimeout(() => {
                feedbackDiv.style.display = 'none';
            }, 5000);
        }
    }

    // Setup admin mailbox interface
    setupAdminMailbox() {
        const mailboxContainer = document.getElementById('admin-mailbox');
        if (!mailboxContainer) return;

        this.renderMailbox();
    }

    // Render mailbox interface
    renderMailbox() {
        const mailboxContainer = document.getElementById('admin-mailbox');
        const messages = this.getMessages();
        const unreadCount = messages.filter(msg => !msg.isRead).length;

        mailboxContainer.innerHTML = `
            <div class="mailbox-header">
                <h2>Messages <span class="unread-count">${unreadCount > 0 ? `(${unreadCount} unread)` : ''}</span></h2>
                <div class="mailbox-actions">
                    <button class="btn-secondary" onclick="mailbox.markAllAsRead()">Mark All Read</button>
                    <button class="btn-danger" onclick="mailbox.clearAllMessages()">Clear All</button>
                </div>
            </div>
            <div class="mailbox-content">
                ${messages.length === 0 ? 
                    '<div class="no-messages">No messages yet.</div>' : 
                    messages.map(msg => this.renderMessage(msg)).join('')
                }
            </div>
        `;
    }

    // Render individual message
    renderMessage(message) {
        const date = new Date(message.timestamp).toLocaleString();
        const readClass = message.isRead ? 'read' : 'unread';
        const starClass = message.isStarred ? 'starred' : '';
        
        return `
            <div class="message-item ${readClass} ${starClass}" data-message-id="${message.id}">
                <div class="message-header">
                    <div class="message-sender">
                        <strong>${this.escapeHtml(message.name)}</strong>
                        <span class="message-email">${this.escapeHtml(message.email)}</span>
                    </div>
                    <div class="message-meta">
                        <span class="message-date">${date}</span>                        <div class="message-actions">
                            <button class="btn-icon star-btn" onclick="mailbox.toggleStar('${message.id}', this)" title="${message.isStarred ? 'Unstar' : 'Star'}">
                                ${message.isStarred ? '★' : '☆'}
                            </button>
                            <button class="btn-icon delete-btn" onclick="mailbox.deleteMessage('${message.id}', this)" title="Delete">🗑️</button>
                        </div>
                    </div>
                </div>
                <div class="message-subject">
                    <strong>Subject:</strong> ${this.escapeHtml(message.subject)}
                </div>
                <div class="message-content">
                    ${this.escapeHtml(message.message).replace(/\n/g, '<br>')}
                </div>
                ${!message.isRead ? '<div class="message-actions-footer"><button class="btn-primary" onclick="mailbox.markAsRead(\'' + message.id + '\')">Mark as Read</button></div>' : ''}
            </div>
        `;
    }

    // Show brief loading state for better UX
    showActionFeedback(button, action) {
        if (!button) return;
        
        const originalText = button.innerHTML;
        const originalDisabled = button.disabled;
        
        button.disabled = true;
        
        if (action === 'star') {
            button.innerHTML = '⭐'; // Temporary feedback
        } else if (action === 'delete') {
            button.innerHTML = '🗑️'; // Keep same but show it's processing
        }
        
        // Reset after short delay
        setTimeout(() => {
            button.disabled = originalDisabled;
            // Text will be updated by re-render anyway
        }, 200);
    }    // Mark all messages as read
    markAllAsRead() {
        const messages = this.getMessages();
        messages.forEach(msg => msg.isRead = true);
        localStorage.setItem(this.storageKey, JSON.stringify(messages));
        this.renderMailbox();
        this.updateAdminStats();
    }

    // Clear all messages
    clearAllMessages() {
        if (confirm('Are you sure you want to delete all messages? This cannot be undone.')) {
            localStorage.removeItem(this.storageKey);
            this.renderMailbox();
            this.updateAdminStats();
        }
    }

    // Trigger stats update for admin dashboard
    updateAdminStats() {
        // Check if we're on admin page and stats update function exists
        if (typeof updateAdminStats === 'function') {
            updateAdminStats();
        }
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Get message count for navigation badge
    getUnreadCount() {
        return this.getMessages().filter(msg => !msg.isRead).length;
    }
}

// Initialize mailbox system
let mailbox;
document.addEventListener('DOMContentLoaded', () => {
    mailbox = new MailboxSystem();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MailboxSystem;
}
