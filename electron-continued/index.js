const { app, BrowserWindow, session } = require('electron');

let mainWindow;

function createWindow() {

  let ses = session.defaultSession;

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

  /* Load github and wait for it to finish then log all the cookies out */
  // mainWindow.loadURL('https://github.com');


  /* Adding a download event */
  ses.on('will-download', (e, downloadItem, webContents) => {

    let fileName = downloadItem.getFilename();
    let fileSize = downloadItem.getTotalBytes();

    /* Save this file to the desktop */
    downloadItem.setSavePath(app.getPath('desktop') + `/${fileName}`);

    /* Watching Progress of downloaded item */
    downloadItem.on('updated', (e, state) => {
      let received = downloadItem.getReceivedBytes();
      if (state === 'progressing' && received) {
        /* Getting the percentage of progress */
        let progress = Math.round((received / fileSize) * 100);
        /* Setting the UI progress using webContents */
        webContents.executeJavaScript(`window.progress.value = ${progress}`);
      }
    })

  });

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
