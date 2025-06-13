// Maintenance Mode Configuration
// Set to true to enable maintenance mode, false to disable
const MAINTENANCE_MODE = true;

// Developer bypass - set to true if you're testing/developing
const DEVELOPER_MODE = false;

// Function to check and handle maintenance mode
function checkMaintenanceMode() {
    try {
        // Log current status for debugging
        console.log(`🔧 Maintenance Mode: ${MAINTENANCE_MODE ? 'ENABLED' : 'DISABLED'}`);
        console.log(`👨‍💻 Developer Mode: ${DEVELOPER_MODE ? 'ENABLED' : 'DISABLED'}`);
        console.log(`📍 Current Page: ${window.location.pathname}`);
        
        // Skip maintenance check if developer mode is enabled
        if (DEVELOPER_MODE) {
            console.log('🟡 Developer mode enabled - bypassing maintenance check');
            return;
        }
        
        // Skip if we're already on the construction page
        if (window.location.pathname.includes('construction.html')) {
            console.log('🟢 Already on construction page - no redirect needed');
            return;
        }
        
        // If maintenance mode is enabled, redirect to construction page
        if (MAINTENANCE_MODE) {
            console.log('🔴 Maintenance mode enabled - redirecting to construction page');
            
            // Add a small delay to ensure the console message is visible
            setTimeout(() => {
                window.location.href = 'construction.html';
            }, 100);
        } else {
            console.log('🟢 Site is live - no maintenance redirect');
        }
    } catch (error) {
        console.error('❌ Error in maintenance mode check:', error);
        // In case of error, don't redirect to avoid breaking the site
    }
}

// Function to display maintenance status in console
function displayMaintenanceStatus() {
    const status = MAINTENANCE_MODE ? '🔴 UNDER MAINTENANCE' : '🟢 LIVE';
    const devStatus = DEVELOPER_MODE ? ' (DEV MODE)' : '';
    
    console.log(`
╔════════════════════════════════════════╗
║            CADENTIAL STUDIOS           ║
║          Maintenance Status            ║
║                                        ║
║  Status: ${status}${devStatus.padEnd(20 - status.length)}║
║                                        ║
╚════════════════════════════════════════╝
    `);
}

// Run maintenance check when page loads
document.addEventListener('DOMContentLoaded', () => {
    displayMaintenanceStatus();
    checkMaintenanceMode();
});

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MAINTENANCE_MODE, DEVELOPER_MODE, checkMaintenanceMode };
}
