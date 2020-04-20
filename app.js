const menuTemp = [];
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


// On app load
app.on('ready', function() {
  // Load all the necessary files to memory
  load_file_JSON("./DATA/ht.json",(DATA)=>{
    if(DATA == false){
      }else{
      HT = DATA;
    }
  })


  mainWindow = new BrowserWindow({  webPreferences: {nodeIntegration: true}, minWidth: 600, minHeight: 800});
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


function load_file_JSON(path,qx){
  if (fs.existsSync(path)) {
    data = fs.readFileSync(path, 'utf8');
    qx(JSON.parse(data));
  }else{
    qx(false);
  }
}
