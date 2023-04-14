const { app } = require('electron');
const MainWindow = require('./app/main_window');

/* Adding this references so Javascript does not clean these up */
let mainWindow;

app.on('ready', () => {
  mainWindow = new MainWindow({
    url: `file://${__dirname}/src/index.html`,
    height: 600,
    width: 800,
    x: 2500,
    y: 0,
    webPreferences: {
      /**  
        * --- !! IMPORTANT !! ---
        *  Disable 'contextIsolation' to allow 'nodeIntegration'
        * 'contextIsolation' defaults to "true" as from Electron v12
       */
      contextIsolation: false,
      nodeIntegration: true,
      /* this makes it run all events even if its running in the background */
      backgroundThrottling: false,
    },
  });
});
