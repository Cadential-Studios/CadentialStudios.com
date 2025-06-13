# Maintenance Mode Instructions

## Quick Setup Guide

### 🔧 To Enable Maintenance Mode:
1. Open `js/maintenance.js`
2. Change `const MAINTENANCE_MODE = false;` to `const MAINTENANCE_MODE = true;`
3. Save the file
4. **All visitors will now be redirected to the construction page**

### ✅ To Disable Maintenance Mode:
1. Open `js/maintenance.js` 
2. Change `const MAINTENANCE_MODE = true;` to `const MAINTENANCE_MODE = false;`
3. Save the file
4. **Site is now live for all visitors**

### 👨‍💻 Developer Mode (Bypass Maintenance):
- Set `const DEVELOPER_MODE = true;` to bypass maintenance checks
- Useful when you need to test the main site while maintenance mode is enabled
- **Remember to set back to `false` before going live**

## How It Works

- **Automatic Redirect**: When maintenance mode is enabled, all pages automatically redirect to `construction.html`
- **Instant Updates**: Changes take effect immediately - no server restart needed
- **Smart Detection**: The script won't redirect if you're already on the construction page
- **Developer Friendly**: Console logs show when redirects occur

## File Locations

- **Main Script**: `js/maintenance.js`
- **Construction Page**: `construction.html`
- **Applied To**: All main site pages (index.html, projects.html, about.html, contact.html, 404.html)

## Tips

1. **Test First**: Always test with `DEVELOPER_MODE = true` before enabling for users
2. **Quick Toggle**: Bookmark the maintenance.js file for quick access
3. **Check Console**: Open browser dev tools to see maintenance mode status
4. **Backup Plan**: Keep a backup of your maintenance.js file with different settings

---
*Cadential Studios - Quality from start to finish*
