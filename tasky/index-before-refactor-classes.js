const { app, BrowserWindow, Tray } = require('electron');
const path = require('path'); // *** Great for getting path for both windows and OSX

let mainWindow;
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
  // mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => app.quit());

  /* Adding Tray */
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new Tray(iconPath);
  // Toggle browser window off and on when clicking the icon
  tray.on('click', (event, bounds) => {
    // Click event bounds don't hardcode positions (bad practice)
    const { x, y } = bounds;
    // Window height and width 
    const { height, width } = mainWindow.getBounds();

    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      // Updating Y position for windows since windows it's at the bottom of the screen
      const yPosition = process.platform === 'darwin' ? y : y - height;
      // Positioning this specifically to be under the Tray icon that has been clicked.
      mainWindow.setBounds({
        x: x - width / 2,
        y: yPosition,
        height,
        width,
      });

      mainWindow.show();
    }

  });
};

app.on('ready', createWindow);

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})