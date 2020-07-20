const { remote } = require('electron');
var qHelper  = require('./Js/database/queryhelper');

let currWindow = remote.BrowserWindow.getFocusedWindow();

window.closeCurrentWindow = function(){
  currWindow.close();
}

window.getQueryHelper = function(){
    return qHelper;
}