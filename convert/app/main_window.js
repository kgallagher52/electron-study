const { BrowserWindow, app } = require('electron');

class MainWindow extends BrowserWindow {
  constructor(options) {
    super({
      width: options.width,
      height: options.height,
      x: options.x,
      y: options.y,
      webPreferences: options.webPreferences,
    })
    this.loadURL(options.url)
    this.on('closed', this.onClosed.bind(this));
  }

  onClosed() {
    app.quit();
  }
}

module.exports = MainWindow;