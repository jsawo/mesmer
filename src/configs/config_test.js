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
		title: 'Sine 220',
		volume: 0.2,
		source: 'wave',
		options: {
			type: 'sine',
			frequency: 220,
		},
	},
	{
		title: 'Sine 440',
		volume: 0.2,
		source: 'wave',
		options: {
			type: 'sine',
			frequency: 440,
		},
	},
	{
		title: 'Sine 660',
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
		title: 'Sine 880',
		volume: 0.2,
		source: 'wave',
		options: {
			type: 'sine',
			frequency: 880,
		},
	},
	{
		title: 'Sine 1100',
		volume: 0.2,
		source: 'wave',
		options: {
			type: 'sine',
			frequency: 1100,
		},
	},
	// {
	// 	title: 'Sawtooth gen',
	// 	volume: 0.4,
	// 	source: 'wave',
	// 	options: {
	// 		type: 'sawtooth',
	// 	},
	// },
	{
		title: 'My Script',
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
