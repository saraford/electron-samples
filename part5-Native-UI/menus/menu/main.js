'use strict';

const {app, BrowserWindow, ipcMain, Menu, dialog} = require('electron');

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
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
});

const template = [
  {
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        // on reload, start fresh and close any old
        // open secondary windows
        if (focusedWindow.id === 1) {
          BrowserWindow.getAllWindows().forEach(function (win) {
            if (win.id > 1) {
              win.close()
            }
          })
        }
        focusedWindow.reload()
      }
    }
  }, {
    label: 'Toggle Full Screen',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Ctrl+Command+F'
      } else {
        return 'F11'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
      }
    }
  }, {
    label: 'Toggle Developer Tools',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Alt+Command+I'
      } else {
        return 'Ctrl+Shift+I'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.toggleDevTools()
      }
    }
  }]
},{
    label: 'Demo',
    submenu: [{
      label: 'App Menu Demo',
      click: function (item, focusedWindow) {
        if (focusedWindow) {
          const options = {
            type: 'info',
            title: 'Application Menu Demo',
            buttons: ['Ok'],
            message: 'This demo is for the Menu section, showing how to create a clickable menu item in the application menu.'
          }
          dialog.showMessageBox(focusedWindow, options, function () {});
        }
      }
    }]
  }];

if (process.platform == 'darwin') {
  var name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() { app.quit(); }
      },
    ]
  });
}
