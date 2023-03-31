const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('captureSources', {
	getAllSource: (sources) => ipcRenderer.invoke('source:getAll', sources),
	getPrimaryDisplay: (display) =>
		ipcRenderer.invoke('getPrimaryDisplay', display),
});
