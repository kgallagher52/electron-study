const { app, BrowserWindow, Tray } = require('electron');
const path = require('path'); // *** Great for getting path for both windows and OSX

let mainWindow;
let tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200, height: 800, // This is just a custom size for my use
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
  // mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => app.quit());

  /* Adding Tray */
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new Tray(iconPath);
  // Toggle browser window off and on when clicking the icon
  tray.on('click', (event, bounds) => {
    console.log(event, bounds)
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
};

app.on('ready', createWindow);

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})