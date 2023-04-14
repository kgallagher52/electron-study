const { app, ipcMain } = require('electron');
const ffmpeg = require('fluent-ffmpeg');
const _ = require('lodash');
const MainWindow = require('./app/main_window');
const { promises } = require('readline');

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

ipcMain.on('videos:added', (event, videos) => {
  /* Old code with the assumption we are only getting one video */
  // const promise = new Promise((resolve, reject) => {
  //   ffmpeg.ffprobe(videos[0], (err, metadata) => {
  //     resolve(metadata);
  //   })
  // });
  // promise.then((metadata) => {
  // });

  const promises = _.map(videos, video => {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(video.path, (err, metadata) => {
        if (err) reject('Could not get videos');
        resolve(
          {
            ...video,
            duration: metadata.format.duration,
            format: 'avi'
          });
      })
    });
  });
  /* 
    This makes it so we are not replying 
    back to the React and Redux side of 
    the application till all as finished 
  */
  Promise.all(promises).then((results) => {
    console.log(results)
    mainWindow.webContents.send('metadata:complete', results);
  });
})
