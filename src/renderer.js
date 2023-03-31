window.document.addEventListener('DOMContentLoaded', () => {
	const video = document.querySelector('video');
	const sourcesBlock = document.querySelector('.sources-list');
	const sourcesBtn = document.querySelector('.sources-btn');

	let activeStreamId;

	sourcesBtn.addEventListener('click', () => {
		sourcesBlock.classList.add('open');
		sourcesBlock.innerHTML = '';
		sourcesBtn.innerHTML = 'Refresh sources';
		sourcesBtn.style.backgroundColor = '#fb923c';
		renderSources();
	});

	const onStreamChange = (streamId, listItem) => {
		startStream(streamId);
		document.querySelectorAll('.source-item').forEach((item) => {
			item.classList.remove('active');
			if (item.dataset.id === activeStreamId) {
				listItem.classList.add('active');
			}
		});
	};

	const renderSources = async () => {
		const sources = await captureSources.getAllSource();

		sources.forEach((source, i) => {
			const li = document.createElement('li');

			li.textContent = `${i + 1}. ${source.name}`;
			li.dataset.id = source.id;
			li.className =
				li.dataset.id === activeStreamId ? 'source-item active' : 'source-item';

			li.addEventListener('click', () => onStreamChange(source.id, li));

			sourcesBlock.appendChild(li);
		});
	};

	const startStream = async (sourceId) => {
		if (!sourceId) {
			const { id: primaryDisplayId } = await captureSources.getPrimaryDisplay();
			const sources = await captureSources.getAllSource();
			const primarySource = sources.find(
				({ display_id }) => display_id == primaryDisplayId
			);

			activeStreamId = primarySource.id;
		} else {
			activeStreamId = sourceId;
		}

		const stream = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: {
				mandatory: {
					chromeMediaSource: 'desktop',
					chromeMediaSourceId: activeStreamId,
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
	renderSources();
});
