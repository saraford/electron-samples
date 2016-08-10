'use strict';

const {app, BrowserWindow, ipcMain, dialog, globalShortcut} = require('electron');

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

app.on('ready', function () {
  globalShortcut.register('CommandOrControl+Alt+T', function () {
    dialog.showMessageBox({
      type: 'info',
      message: 'Success!',
      detail: 'You pressed the registered global shortcut keybinding.',
      buttons: ['OK']
    })
  })
})

app.on('will-quit', function () {
  globalShortcut.unregisterAll()
})
