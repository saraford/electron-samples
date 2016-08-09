'use strict';

const {app, BrowserWindow, ipcMain} = require('electron');

var mainWindow = null;

app.on('ready', function() {

    mainWindow = new BrowserWindow({
        height: 300,
        width: 400
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');
    //  mainWindow.webContents.openDevTools();
});

ipcMain.on('close-app', function () {
    app.quit();
});
