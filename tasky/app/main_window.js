const { BrowserWindow, app } = require('electron');

class MainWindow extends BrowserWindow {
  constructor(options) {
    // *** Hard coding this is not preferred 
    super({
      width: options.width,
      height: options.height,
      x: options.x,
      y: options.y,
      webPreferences: options.webPreferences,
      frame: options.frame,
      resizable: options.resizable,
      show: options.show,
    })
    this.loadURL(options.url)
    this.on('blur', this.onBlur.bind(this));
    this.on('closed', this.onClosed.bind(this));
  }
  onBlur() {
    this.hide();
  }
  onClosed() {
    app.quit();
  }
}

module.exports = MainWindow;