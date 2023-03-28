window.document.addEventListener('DOMContentLoaded', () => {
	const video = document.querySelector('video');
	const sourcesBlock = document.querySelector('.sources-list');
	const sourcesBtn = document.querySelector('.sources-btn');

	sourcesBtn.addEventListener('click', () => {
		sourcesBlock.classList.add('open');
		sourcesBlock.innerHTML = '';
		sourcesBtn.innerHTML = 'Refresh sources';
		sourcesBtn.style.backgroundColor = '#fb923c';
		renderSources();
	});

	const renderSources = async () => {
		const sources = await captureSources.getAllSource();

		sources.forEach((s, i) => {
			const li = document.createElement('li');
			li.className = 'source-item';
			li.textContent = `${i + 1}. ${s.name}`;
			li.addEventListener('click', () => {
				startStream(s.id);
			});
			sourcesBlock.appendChild(li);
		});
	};

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
