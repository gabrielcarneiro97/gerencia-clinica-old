"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
var mainWindow;
function createApp() {
    mainWindow = new electron_1.BrowserWindow({
        backgroundColor: '#e0e0e0',
        autoHideMenuBar: true,
        show: false,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    mainWindow.maximize();
    mainWindow.show();
    if (isDev)
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : "file://" + path.join(__dirname, '../build/index.html'));
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
electron_1.app.on('ready', createApp);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createApp();
    }
});
