const electron = require('electron');
const { app, BrowserWindow, screen } = electron;

let mainWindow;

function createWindow() {

  /* Working with screens */
  let displays = screen.getAllDisplays();

  /* Getting primary display size */
  console.log(`${displays[0].size.width} x ${displays[0].size.height}`);
  /* Getting primary display coordinates */
  console.log(`${displays[0].bounds.x} x ${displays[0].bounds.y}`);
  /* Getting secondary display size */
  console.log(`${displays[1].size.width} x ${displays[1].size.height}`);
  /* Getting secondary display coordinates */
  console.log(`${displays[1].bounds.x} x ${displays[1].bounds.y}`);

  // let ses = session.defaultSession;

  // let getCookies = () => {
  //   ses.cookies.get({ name: 'cookie1' })
  //     .then(cookies => {
  //       console.log(cookies);
  //     }).catch(err => {
  //       console.log(err);
  //     })
  // }

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    x: 100, y: 100,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    },
  })

  // mainWindow.webContents.openDevTools();

  mainWindow.loadFile('index.html');

  /* This will fire even if your not on the application so make sure very unique */
  // globalShortcut.register('CommandOrControl+G', () => {
  //   console.log("User pressed G")
  //   globalShortcut.unregister('CommandOrControl+G')
  // });

  // mainWindow.webContents.on('did-finish-load', () => {
  //   /* Custom Dialog */
  //   // dialog.showOpenDialog(mainWindow, {
  //   //   buttonLabel: 'Select a photo',
  //   //   defaultPath: app.getPath('desktop'),
  //   //   properties: ['multiSelections', 'createDirectory', 'openFile', 'openDirectory']
  //   // }).then(result => {
  //   //   console.log(result)
  //   // })
  //   // /* Save Dialog */
  //   // dialog.showSaveDialog({}).then(result =>{
  //   //   console.log(result)
  //   // })

  //   /* Creating A Message Box */
  //   const answers = ['Yes', 'No', 'Maybe'];

  //   dialog.showMessageBox(mainWindow, {
  //     title: 'Message Box',
  //     message: 'Please select an option',
  //     detail: 'Message Details.',
  //     buttons: answers
  //   }).then(result => {
  //     console.log(`User selected: ${answers[result.response]}`);
  //   })

  // })

  /* Load github and wait for it to finish then log all the cookies out */
  // mainWindow.loadURL('https://github.com');


  /* Adding a download event */
  // ses.on('will-download', (e, downloadItem, webContents) => {

  //   let fileName = downloadItem.getFilename();
  //   let fileSize = downloadItem.getTotalBytes();

  /* Save this file to the desktop */
  // downloadItem.setSavePath(app.getPath('desktop') + `/${fileName}`);

  /* Watching Progress of downloaded item */
  // downloadItem.on('updated', (e, state) => {
  //   let received = downloadItem.getReceivedBytes();
  //   if (state === 'progressing' && received) {
  //     /* Getting the percentage of progress */
  //     let progress = Math.round((received / fileSize) * 100);
  //     /* Setting the UI progress using webContents */
  //     webContents.executeJavaScript(`window.progress.value = ${progress}`);
  //   }
  // })

  // });

  /* Deleting a cookie */
  // ses.cookies.remove('https://keatongallagher.com', 'cookie1').then(() => {
  //   getCookies();
  // })

  /* Creating our own cookie object */
  // let cookie = { url: 'https://keatongallagher.com', name: 'cookie1', value: 'electron', expirationDate: 1713644679.186226 };

  /* setting our cookie to our session storage session.defaultSession */
  // ses.cookies.set(cookie).then(() => {
  //   console.log('cookie2 set');
  //   getCookies();
  // });

  // mainWindow.webContents.on('did-finish-load', e => {
  //   getCookies();
  // })

  /* Listen for window being closed */
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  /* These are useful for if the computer falls asleep etc... */
  electron.powerMonitor.on('resume', e => {
    mainWindow = null
  })

  electron.powerMonitor.on('suspend', e => {
    console.log("Saving some data")
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
