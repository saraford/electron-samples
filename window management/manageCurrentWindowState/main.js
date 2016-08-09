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

    mainWindow.on('move', updateText);
    mainWindow.on('resize', updateText);

    function updateText() {
       var message = `Size: ${mainWindow.getSize()} Position: ${mainWindow.getPosition()}`
       mainWindow.webContents.send('move', message);
    }

});

ipcMain.on('close-app', function () {
    app.quit();
});
