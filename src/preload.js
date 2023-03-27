const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('captureSources', {
	getAllSource: (sources) => ipcRenderer.invoke('source:getAll', sources),
});
