const electron = require('electron');
const app = electron.app;
const Tray = electron.Tray;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;

// electron reload for development
require('electron-reload')(__dirname);

let mainWindow;
let appTray;

let createMainWindow = () => {
    mainWindow = new BrowserWindow({
        fullscreen: false,
        width: 450,
        height: 670,
        icon: __dirname + '/app_icon.png'
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
};

let createTray = () => {
  appTray = new Tray(__dirname + '/tray_icon.png');
  appTray.setToolTip('Did Do');
  appTray.setContextMenu(
    Menu.buildFromTemplate([
      { label: 'Add', accelerator: 'CmdOrCtrl+N', click: () => { /* do something */ } }
    ])
  );
};

app.on('ready', () => {
    createMainWindow();
    createTray();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});

app.dock.setIcon(__dirname + '/app_icon.png');
