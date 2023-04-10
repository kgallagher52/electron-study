const { app, BrowserWindow } = require('electron');

// app is the overall running process 

/***
 * Electron lifecycle process created by app
 *  Electron Starts
 *  App Process is created 
 *  App Ready to Star doing things
 *  
 *  App closes down
 */


/* 
  Keep a global reference of the window object, if you don't, the window will
  be closed automatically when the JavaScript object is garbage collected.
 */

let mainWindow;

// Event handler to handle starting application

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000, height: 800, 
    x: 2500, y: 0, // Tell where on the users screen to put the app
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    }
  })  
  mainWindow.loadFile('index.html');
  // Loading the dev tools 
  mainWindow.webContents.openDevTools();

}
app.on('ready', createWindow);


// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})