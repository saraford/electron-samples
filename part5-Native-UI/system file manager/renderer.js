'use strict'

const $ = require('jquery');
const ipcRenderer = require('electron').ipcRenderer;
const shell = require('electron').shell
const os = require('os')

const wireUpButtons = () => {

  let closeButton = $('#close-window');
  let open_fs_button = $('#open-fs-button');

  closeButton.on('click', function() {
    ipcRenderer.send('close-app');
  });

  open_fs_button.on('click', function () {
    shell.showItemInFolder(os.homedir());
  });
}

document.addEventListener('DOMContentLoaded', function() {
  wireUpButtons();
});
