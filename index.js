const { app } = require('electron');

// app is the overall running process 

/***
 * Electron lifecycle process created by app
 *  Electron Starts
 *  App Process is created 
 *  App Ready to Star doing things
 *  
 *  App closes down
 */

// Event handler to handle starting application
app.on('ready', () => {
  console.log("App is ready");
});