const { Tray } = require('electron');

// Creating class for timer tray 
class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);
    this.mainWindow = mainWindow
    // Remember that these methods on this are coming from Tray parent class
    this.setToolTip('Timer App');
    // Setting up on click right away from the Tray class
    this.on('click', this.onClick.bind(this));
  }
  // Toggle browser window off and on when clicking the icon
  onClick(event, bounds) {
    // Click event bounds don't hardcode positions (bad practice)
    const { x, y } = bounds;
    // Window height and width 
    const { height, width } = this.mainWindow.getBounds();

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      // Updating Y position for windows since windows it's at the bottom of the screen
      const yPosition = process.platform === 'darwin' ? y : y - height;
      // Positioning this specifically to be under the Tray icon that has been clicked.
      this.mainWindow.setBounds({
        x: x - width / 2,
        y: yPosition,
        height,
        width,
      });

      this.mainWindow.show();
    }
  }
}

module.exports = TimerTray;