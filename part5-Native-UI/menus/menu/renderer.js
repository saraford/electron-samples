'use strict'

const $ = require('jquery');
const ipcRenderer = require('electron').ipcRenderer;

const wireUpButtons = () => {

  let $closeButton = $('#close-window');

  $closeButton.on('click', function() {
    ipcRenderer.send('close-app');
  });
}

document.addEventListener('DOMContentLoaded', function() {
  wireUpButtons();
});
