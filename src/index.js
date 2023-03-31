const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');
require('electron-reload')(__dirname);
const getSources = require('./utils/getSources');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
	app.quit();
}

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		width: 690,
		height: 500,
		resizable: false,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	mainWindow.loadFile(path.join(__dirname, 'index.html'));
	mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
	createWindow();

	ipcMain.handle('source:getAll', getSources);
	ipcMain.handle('getPrimaryDisplay', () => screen.getPrimaryDisplay());

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
