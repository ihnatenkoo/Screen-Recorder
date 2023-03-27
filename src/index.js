const {
	app,
	BrowserWindow,
	screen,
	desktopCapturer,
	ipcMain,
} = require('electron');
const path = require('path');
require('electron-reload')(__dirname);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
	app.quit();
}

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		width: 700,
		height: 500,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	mainWindow.loadFile(path.join(__dirname, 'index.html'));
	mainWindow.webContents.openDevTools();
};

const getMainSource = async () => {
	const sources = await desktopCapturer.getSources({
		types: ['window', 'screen'],
	});

	return sources[0];
};

app.whenReady().then(() => {
	createWindow();

	ipcMain.handle('source:getMain', getMainSource);

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
