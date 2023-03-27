const { desktopCapturer } = require('electron');

module.exports = getSources = async () => {
	const sources = await desktopCapturer.getSources({
		types: ['window', 'screen'],
	});

	return sources;
};
