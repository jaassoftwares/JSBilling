const {app, BrowserWindow} = require('electron') 
const url = require('url') 
const path = require('path')  
const {ipcMain} = require('electron')

let win  

function createWindow() { 
   win = new BrowserWindow({
     titleBarStyle: 'hidden',frame: true ,width: 800, height: 600,
     webPreferences: {
      preload: path.join(app.getAppPath(), 'preloader.js')
    }}) 
  // win.setMenu(null)
win.webContents.openDevTools();
   win.loadURL(url.format ({ 
      pathname: path.join(__dirname, 'View/mainPage.html'), 
      protocol: 'file:', 
      slashes: true 
   })) 
}  
// Event handler for asynchronous incoming messages
ipcMain.on('asynchronous-message', (event, arg) => {
   console.log(arg)

   // Event emitter for sending asynchronous messages
   event.sender.send('asynchronous-reply', 'async pong')
})

// Event handler for synchronous incoming messages
ipcMain.on('synchronous-message', (event, arg) => {
   console.log(arg) 

   // Synchronous event emmision
   event.returnValue = 'sync pong'
})



app.on('ready', createWindow)
