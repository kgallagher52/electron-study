const { app, BrowserWindow } = require('electron');
const path = require('path'); // *** Great for getting path for both windows and OSX
const TimerTray = require('./app/timer_tray');

let mainWindow;
// Adding this reference so the time tray does not get cleaned up by javascript
let tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 300, height: 500, // This is just a custom size for my use
    x: 2500, y: 0, // Tell where on the users screen to put the app
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    },
    // Remove status bar at the top
    frame: false,
    // Remove the ability to resize the window
    resizable: false,
    // Don't show the browser window on start of application
    show: false,
  })
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  // Event for when user clicks out of the window
  mainWindow.on('blur', () => {
    mainWindow.hide();
  });

  // mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => app.quit());

  /* Adding Tray */
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TimerTray(iconPath, mainWindow);
};

app.on('ready', createWindow);

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})