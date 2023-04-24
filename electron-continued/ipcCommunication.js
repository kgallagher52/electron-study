const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    },
  })

  mainWindow.webContents.openDevTools();
  mainWindow.loadFile('index.html');


  /* Sending a message directly to the web window */
  mainWindow.webContents.on('did-finish-load', e => {
    mainWindow.webContents.send('mailbox', {
      from: 'Keaton',
      email: 'myfakeemail@fake.com',
      priority: 1
    })
  })

  /* Listen for window being closed */
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}


/* Setting up a synchronous message vs default which is asynchronous */
ipcMain.on('sync-message', (e, args) => {
  console.log(args);
  /* this demands a response and will block the remaining processes from happening till we get the response */
  e.returnValue = 'A sync response from the main process!'
})

/* ipcMain event */
ipcMain.on('channel1', (e, args) => {
  /* Finding where the message came from */
  e.sender.send('channel1-response', 'Message received on "channel1", Thank you!');
  console.log(args);
});


// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
