const { ipcRenderer } = require('electron');

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const {path} = document.querySelector('input').files[0];
  // Sending path of file to the electron application using IPC
  ipcRenderer.send('videoSubmitted', path);

});
// Receive the event of duration from function above
ipcRenderer.on('videoDuration', (e, duration) => {
  console.log(duration)
  document.querySelector('#durationResult').innerHTML = `Video Duration is: ${duration}`
})