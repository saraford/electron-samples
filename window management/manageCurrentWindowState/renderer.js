'use strict'

const $ = require('jquery');
const ipcRenderer = require('electron').ipcRenderer;
const BrowserWindow = require('electron').remote.BrowserWindow

let closeButton = undefined;
let manageWindowReply = undefined;

const wireUpButtons = () => {

  closeButton = $('#close-window');
  manageWindowReply = document.getElementById('manage-window-reply');

  closeButton.on('click', function() {
    ipcRenderer.send('close-app');
  });
}

ipcRenderer.on('move', (event, message) => {
    console.log(message);
    manageWindowReply.innerText = message;
})

document.addEventListener('DOMContentLoaded', function() {
  wireUpButtons();
});
