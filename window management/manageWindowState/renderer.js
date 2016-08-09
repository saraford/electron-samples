'use strict'

const $ = require('jquery');
const ipcRenderer = require('electron').ipcRenderer;
const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const modalPath = path.join('file://', __dirname, 'manage-modal.html');

const wireUpButtons = () => {

  let closeButton = $('#close-window');
  closeButton.on('click', function() {
    ipcRenderer.send('close-app');
  });

  let newWinButton = $('#new-window-button');
  newWinButton.on('click', function() {

    let win = new BrowserWindow({ width: 400, height: 275 })

    win.on('resize', updateReply);
    win.on('move', updateReply);
    win.on('close', function () { win = null });
    win.loadURL(modalPath);
    win.show();

    function updateReply () {
      const manageWindowReply = document.getElementById('manage-window-reply')
      const message = `Size: ${win.getSize()} Position: ${win.getPosition()}`

      manageWindowReply.innerText = message
    }

  });


}

document.addEventListener('DOMContentLoaded', function() {
  wireUpButtons();
});
