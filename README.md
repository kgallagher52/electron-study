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
