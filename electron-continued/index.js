// Modules
const { app, BrowserWindow, session } = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let secWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {

  let customSes = session.fromPartition('persist:part1')

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    x: 100, y: 100, // Tell where on the users screen to put the app
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    },
  })

  secWindow = new BrowserWindow({
    width: 800, height: 600,
    x: 200, y: 200,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      partition: 'persist:part1' // <-- if partition session does not exist create it

    }
  })

  let defaultSes = session.defaultSession
  // Clear service workers and all storage
  defaultSes.clearStorageData()

  // Load index.html into the new BrowserWindow
  // mainWindow.loadURL('https://httpbin.org/basic-auth/user/passwd')
  mainWindow.loadFile('index.html')
  secWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();
  secWindow.webContents.openDevTools();

  let wc = mainWindow.webContents;

  wc.on('context-menu', (e, params) => {
    console.log(`User selected Text: ${params.selectionText}`)
    console.log(`Selection can be copied: ${params.editFlags.canCopy}`)
  })

  //HANDLING LOGIN EVENT
  // wc.on('login', (e,request, authInfo, callback) => {
  //   console.log('Logging In:')
  //   callback('user', 'passwd') // handle auth 
  // })

  // //CAPTURING NAVIGATE AS A SORT OF MIDDLEWARE 
  // wc.on('did-navigate', (e, url, statusCode, message) => {
  //   console.log(`Navigated to: ${url} with message ${message}`);
  //   console.log(statusCode)
  // })

  // Listen for window being closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  secWindow.on('closed', () => {
    mainWindow = null
  })
}

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
