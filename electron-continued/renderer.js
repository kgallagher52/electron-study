// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { desktopCapturer } = require('electron');


/* Getting progress element from html */
// window.progress = document.getElementById('progress');


/* Desktop Capturer */
document.getElementById('screenshotButton').addEventListener('click', () => {
  desktopCapturer.getSources({ types: ['screen'] }).then(sources => {
    console.log(sources)
    document.getElementById('screenshot').src = sources[0].thumbnail.toDataURL()
  }).catch(error => {
    console.log(error);
  });
})