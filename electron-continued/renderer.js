// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { desktopCapturer, ipcRenderer } = require('electron');


/* Getting progress element from html */
// window.progress = document.getElementById('progress');


/* Desktop Capturer */
// document.getElementById('screenshotButton').addEventListener('click', () => {
//   desktopCapturer.getSources({ types: ['screen'] }).then(sources => {
//     console.log(sources)
//     document.getElementById('screenshot').src = sources[0].thumbnail.toDataURL()
//   }).catch(error => {
//     console.log(error);
//   });
// })

/* ipcRenderer */

/* Sending a message to the main process */
document.getElementById('talk').addEventListener('click', e => {
  e.preventDefault();
  // ipcRenderer.send('channel1', 'Hello from main window!');

  /* Sending Sync message */
  let res = ipcRenderer.sendSync('sync-message', 'waiting for response...');
  console.log(res)
});

/* Receiving a response from the main process */
ipcRenderer.on('channel1-response', (e, args) => {
  console.log(`Response from main process: ${args}`);
})

/* Receiving a response from the main process message directly sent */
ipcRenderer.on('mailbox', (e, args) => {
  console.log(args);
})