module.exports = [
	{
		title: 'White Noise',
		source: 'script',
		volume: 0.1,
		options: {
			audioFunction: function(e) {
				let output = e.outputBuffer.getChannelData(0);
				for (let i = 0; i < e.outputBuffer.length; i++)
					output[i] = Math.random() * 2 - 1;
			},
		},
	},
	{
		title: 'Pink Noise',
		source: 'script',
		volume: 0.4,
		options: {
			audioFunction: function(e) {
				let output = e.outputBuffer.getChannelData(0);
				var b0, b1, b2, b3, b4, b5, b6;
				b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
				for (let i = 0; i < e.outputBuffer.length; i++) {
					var white = Math.random() * 2 - 1;
					b0 = 0.99886 * b0 + white * 0.0555179;
					b1 = 0.99332 * b1 + white * 0.0750759;
					b2 = 0.969 * b2 + white * 0.153852;
					b3 = 0.8665 * b3 + white * 0.3104856;
					b4 = 0.55 * b4 + white * 0.5329522;
					b5 = -0.7616 * b5 - white * 0.016898;
					output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
					output[i] *= 0.11; // (roughly) compensate for gain
					b6 = white * 0.115926;
				}
			},
		},
		bufferSize: 4096,
	},
	{
		title: 'Brown Noise',
		source: 'script',
		options: {
			audioFunction: function(e) {
				let output = e.outputBuffer.getChannelData(0);
				var lastOut = 0.0;
				b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
				for (let i = 0; i < e.outputBuffer.length; i++) {
					var white = Math.random() * 2 - 1;
					output[i] = (lastOut + 0.02 * white) / 1.02;
					lastOut = output[i];
					output[i] *= 3.5; // (roughly) compensate for gain
				}
			},
		},
		bufferSize: 4096,
	},
];
