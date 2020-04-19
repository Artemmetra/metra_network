const electron = require('electron');
const url = require('url');
const path = require('path');
const ipc = electron.ipcMain;
const fs = require('fs');

const {
  app,
  BrowserWindow,
  Menu
} = electron;

let mainWindow;

  mainWindow = new BrowserWindow({  webPreferences: {nodeIntegration: true}, transparent: false, minWidth: 600, minHeight: 800, titleBarStyle: 'customButtonsOnHover', frame: false});
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,

  }));


  mainWindow.on('closed', ()=>{
    mainWindow = null;
  })

  const mainMenu = Menu.buildFromTemplate(menuTemp);
  Menu.setApplicationMenu(mainMenu);
});



// TAKEN FROM NODE JS
var inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}
