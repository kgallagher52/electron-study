const { app } = require('electron');
const path = require('path'); // *** Great for getting path for both windows and OSX
const TimerTray = require('./app/timer_tray');
const MainWindow = require('./app/main_window');

// Adding this references so Javascript does not clean these up
let mainWindow;
let tray;

app.on('ready', () => {
  /* Hiding icon of electron from the main dock */
  app.dock.hide();

  mainWindow = new MainWindow({
    url: `file://${__dirname}/src/index.html`,
    width: 300,
    height: 500,
    x: 2500,
    y: 0,
    webPreferences: {
      /**  
        * --- !! IMPORTANT !! ---
        *  Disable 'contextIsolation' to allow 'nodeIntegration'
        * 'contextIsolation' defaults to "true" as from Electron v12
       */
      contextIsolation: false,
      nodeIntegration: true
    },
    /* Remove status bar at the top */
    frame: false,
    /* Remove the ability to resize the window */
    resizable: false,
    /* Don't show the browser window on start of application */
    show: false,
  });


  /* Adding Tray */
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TimerTray(iconPath, mainWindow);

});
