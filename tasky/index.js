const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    x: 2500, y: 0, // Tell where on the users screen to put the app
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('./src/index.html');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => app.quit());
}

app.on('ready', createWindow);

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})