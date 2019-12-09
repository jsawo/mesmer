module.exports = [
	{
		title: 'Some file',
		source: 'file',
		volume: 0.5,
		options: {
			path: 'folder/name.ogg',
			stretch: 1,
		},
	},
	{
		title: 'Sine wave',
		volume: 0.2,
		source: 'wave',
		options: {
			type: 'sine',
			frequency: 660,
			attack: 10,
			release: 5,
		},
	},
	{
		title: 'Noise script',
		source: 'script',
		options: {
			audioFunction: function(e) {
				var output = e.outputBuffer.getChannelData(0);
				for (var i = 0; i < e.outputBuffer.length; i++)
					output[i] = Math.random();
			},
		},
	},
	{
		source: 'playlist',
	},
];
