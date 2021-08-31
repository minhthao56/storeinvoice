const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("apiElectron", {
  sendMessages(event, message) {
    ipcRenderer.send(event, message);
  },

  on(event, callback) {
    ipcRenderer.on(event, callback);
  },

  removeListener(event, callback) {
    ipcRenderer.removeListener(event, callback);
  },
});
