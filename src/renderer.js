window.document.addEventListener('DOMContentLoaded', () => {
	const video = document.querySelector('video');
	const sourcesBlock = document.querySelector('.sources');

	sourcesBlock.addEventListener('click', () => {
		sourcesBlock.classList.toggle('open')
	})

	const renderSources = async () => {
		const sources = await captureSources.getAllSource();

		sources.forEach((s,i) => {
			const li = document.createElement('li');
			li.className = 'source-item';
			li.textContent = `${i+1}. ${s.name}`;
			li.addEventListener('click', () => {
				startStream(s.id);
			});
			sourcesBlock.appendChild(li);
		});
	};

	renderSources();

	const startStream = async (id = 'screen:0:0') => {
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: {
				mandatory: {
					chromeMediaSource: 'desktop',
					chromeMediaSourceId: id,
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

	startStream();
});
