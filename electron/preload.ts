const { contextBridge } = require('electron');

// Expose any required APIs to the renderer process here
contextBridge.exposeInMainWorld('electron', {
  // Add any required APIs here
  platform: process.platform,
  isDev: process.env.NODE_ENV === 'development',
});
