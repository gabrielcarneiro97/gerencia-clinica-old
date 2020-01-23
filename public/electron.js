"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
let mainWindow;
function createApp() {
    mainWindow = new electron_1.BrowserWindow({
        backgroundColor: '#e0e0e0',
        autoHideMenuBar: true,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
        },
    });
    mainWindow.maximize();
    mainWindow.show();
    if (isDev)
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
electron_1.app.on('ready', createApp);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (mainWindow === null) {
        createApp();
    }
});
