function log(msg) {
  if (!document.logPanel) {
    document.logPanel = document.getElementById('log');
  }
  document.logPanel.innerHTML += (msg ? msg : '') + '<br />';
}

function inspect(obj, type) {
  log((type ? type + ' ': '') + '{');
  for (prop in obj) {
    var value = obj[prop];
    /*
    if (typeof(value) == 'function') {
      value = '[object Function]';
    }
    */
    log(prop + ' => ' + value);
  }
  log('}');
}
