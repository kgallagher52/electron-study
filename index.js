const { app, BrowserWindow, Menu, ipcMain } = require('electron');
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
let addWindow;

// Event handler to handle starting application

function createWindow() {
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
  mainWindow.loadFile('./todo/todo.html');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => app.quit());

  // Make sure to build menu first before setting application menu
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

}

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300, height: 200,
    title: 'Add New Todo',
    parent: mainWindow,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    }
  })
  addWindow.loadFile('./todo/todoform.html');
  // addWindow.webContents.openDevTools();
  // *** We add this so that when the window closes it cleans up the memory to the reference addWindow.
  addWindow.on('close', () => addWindow = null);
}

ipcMain.on('todoAdd', (event, todo) => {
  mainWindow.webContents.send('todoAdd', todo);
  // Kill this window
  addWindow.close()
});

app.on('ready', createWindow);


const menuTemplate = [
  // Each one of these represents single menu item
  // *** First object in custom menu on OSX gets merged into Electron
  {
    label: 'File',
    // Buttons that should be placed in file 
    submenu: [
      {
        label: 'New Todo',
        click() {
          createAddWindow()
        }

      },
      {
        label: 'Quit',
        // Testing Mac OS or Windows OS
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      },
    ]
  }
]

// Added this so that our first tab File is not merged into File 
if (process.platform === 'darwin') {
  menuTemplate.unshift({ label: '' });
}

if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'View',
    submenu: [
      { // Setting up a shortcut that is pre-defined with Electron to reload the page
        role: 'reload'
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  })
}

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})