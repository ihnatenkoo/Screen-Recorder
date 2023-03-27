window.document.addEventListener('DOMContentLoaded', () => {
	const video = document.querySelector('video');

	const initStream = async () => {
		const { id: sourceId } = await captureSource.getMainSource();
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: {
				mandatory: {
					chromeMediaSource: 'desktop',
					chromeMediaSourceId: sourceId,
					minWidth: 1280,
					maxWidth: 1280,
					minHeight: 720,
					maxHeight: 720,
				},
			},
		});

		video.srcObject = stream;
		video.onloadedmetadata = (e) => video.play();
	};

	initStream();
});
