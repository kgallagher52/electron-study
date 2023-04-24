# electron-study
Mastering Electron
## Helpful Links

[Forge Auto Updates](https://www.electronforge.io/)
## Section Two Video Info 

[FFMPEG-Fluent](https://www.npmjs.com/package/fluent-ffmpeg)

- FFMPEG
    - Fluent - module that makes working with electron easier
    - Stand alone command line tool 
    - Command  brew install ffmpeg
- IPC system the communication between window and Electron application 

## Section Three handling menu bars
 - *** When creating your own menu it's important to know that it takes away all basic functionality like minimizing application or quitting out. 

 - process.platform = shows us what OS we are running on

 - *** Make sure to add event handler when closing windows so that it cleans up the memory
 
## Section Four Status Tray Applications
[Starter Code](https://github.com/StephenGrider/ElectronCode)
- Tray - is something that is inserted in the top menu where the clock is on OS
#### Creating trays
[Tray Docs](https://www.electronjs.org/docs/latest/api/tray)

#### Bounds System
 - There are two separate types of bounds
    - Window Bounds x & y 
    - Click Event Bounds x & y
 - *** You have to take into account operating systems when working with bounds
 - setBounds() - starts at the top left of the window
 - We add variable references so that Javascript does not garbage collect our classes let tray;


## Section Five Combining Electron with React and Redux
 - Challenge:Solution
    - Get content to appear on screen: Wire up basics of electron
    - Show an interface to receive drag n dropped files: Handled by boilerplate using React and Redux
    - Once a file is received, show a different window: Handled by boilerplate using React and Redux
    - Show details about the video waiting to be converted(duration, file format): Use FFMPEG cli
    - Convert a video: Use FFMPEG cli
    - Show progress bar of conversion process: Handle feedback from FFMPEG cli

# Secondary tutorial 

## Helpful links

[Original Documentation](https://docs.google.com/document/d/1qO9wbtwtzXhPTVeLaeYNcseZCwmie5hp5jIz68NACh4/edit#)

[Udemy Course](https://www.udemy.com/course/master-electron/learn/lecture/6108194#overview)

[Session Docs Electron](electronjs.org/docs/latest/api/session)

[DownloadItem Docs Electron](https://www.electronjs.org/docs/latest/api/download-item#class-downloaditem)

[Custom Dialog Docs Electron](https://www.electronjs.org/docs/latest/api/dialog)

[Global Shortcut Module Docs Electron](https://www.electronjs.org/docs/latest/api/global-shortcut)

[Power Monitor Docs Electron](https://www.electronjs.org/docs/latest/api/power-monitor)

[Screen module Docs Electron](https://www.electronjs.org/docs/latest/api/screen)

[WebFrame Docs Electron](https://www.electronjs.org/docs/latest/api/web-frame)

[desktopCapture Docs Electron](https://www.electronjs.org/docs/latest/api/desktop-capturer)

[ipcMain Docs Electron](https://www.electronjs.org/docs/latest/api/ipc-main)

[Resource For downloading files](https://file-examples.com/)

## Sessions 
 - *** Session on Electron is the store for WebContents data
 - *** Session is shared across multiple web windows
 - *** session.defaultSession - is recommended use of session

### Cookies 
 - Cookies with expirationDate do not get saved with session: true
 - Passing 
```js
   ses.cookies.get({}) 
   // with empty object returns all cookies you can filter it down by adding cookie name into the object 
   ses.cookies.get({ name: 'cookie1' })
```
### DownloadItem
### Creating Custom Dialog

```js
  mainWindow.webContents.on('did-finish-load', () => {
   // First parameter optional without it won't be tied to the window
    dialog.showOpenDialog(mainWindow, {
      buttonLabel: 'Select a photo',
      defaultPath: app.getPath('desktop')
      // Adding more customizations to the dialog
      properties: ['multiSelections', 'createDirectory', 'openFile', 'openDirectory']
    }).then(result => {
      console.log(result)
    })
  })
```
### Creating Save Dialog

```js
  mainWindow.webContents.on('did-finish-load', () => {
    dialog.showSaveDialog({}).then(result =>{
      console.log(result)
    })
  })
```
### Creating Message Dialog

```js
  mainWindow.webContents.on('did-finish-load', () => {
   const answers = ['Yes', 'No', 'Maybe'];

    dialog.showMessageBox({
      title: 'Message Box',
      message: 'Please select an option',
      detail: 'Message Details.',
      buttons: answers
    }).then(result => {
      console.log(`User selected: ${answers[result.response]}`);
    })
  })
```

## Accelerators & globalShortcut

- *** globalShortcut works even if you are not on the application so make sure you know what your doing before making shortcut that will be on the whole computer.

### Setting multiple keys or and unregister
```js
  globalShortcut.register('CommandOrControl+G', () => {
   console.log("User pressed G")
   globalShortcut.unregister('CommandOrControl+G')
  });
```

## powerMonitor
- *** Can only be used on app ready
## screen module
- *** Can only be used on app ready
- use this to get screen information of the users computer

### getting primary screen display and secondary screen display with coordinates of each
```js
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
```
### Getting changes of monitors
```js
  /* Monitors or display changes */
  screen.on('display-metrics-changed', (e, display, metricsChanged) => {
    console.log(metricsChanged);
  })
```

### Setting app to half of the primary window
```js
  let primaryDisplay = screen.getPrimaryDisplay();
    mainWindow = new BrowserWindow({
    /* Setting the window to be half of primary monitor */
    width: primaryDisplay.size.width / 2, height: primaryDisplay.size.height,
    x: primaryDisplay.bounds.x, y: primaryDisplay.bounds.y,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
```

## Section Four Renderer process API
 -  nodeIntegration: true - this allows us to get access to node apis from our js files being loaded in the html file

 ### BrowserWindowProxy

[Browser Proxy Docs Electron](https://www.electronjs.org/blog/electron-18-0#removed-nativewindowopen)

 *** deprecated 
 Prior to Electron 15, window.open was by default shimmed to use BrowserWindowProxy. This meant that window.open('about:blank') did not work to open synchronously scriptable child windows, among other incompatibilities. Since Electron 15, nativeWindowOpen has been enabled by default.


### WebFrame
- module to use if we need to make some content rendering adjustments or sandbox some of the applications js this is the module to use

### desktopCapturer
- *** this is to get screen information from user and can only be used in the main process


## Section Five IPC communication
- Inter-Process Communication

### Two main parts with IPC communication  

 1. ipcMain module - this is for handling on the main process
 2. ipcRenderer module - this is for handling communication on the web views or rendering process

 - *** These two modules need one another to complete communication between electron process and it's windows or rendering process

 - Channels are first parameter in ipcMain.on they are unique identifiers for what to listen for on messages
 
 - *** by default ipc is asynchronous


 ### Sending a message directly to a window
 - *** You can only do this after the content has loaded
 ```js
      /* Sending a message directly to the web window */
      mainWindow.webContents.on('did-finish-load', e => {
         mainWindow.webContents.send('mailbox', 'You have mail!')
      })

      /* On the renderer process we have to add a listener for this */
      /* Receiving a response from the main process message directly sent */
      ipcRenderer.on('mailbox', (e, args) => {
      console.log(`Response from main process: ${args}`);
      })
 
 ```

