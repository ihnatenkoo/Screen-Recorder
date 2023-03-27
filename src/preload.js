const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('captureSource', {
	getMainSource: (item) => ipcRenderer.invoke('source:getMain', item),
});
