module.exports = [
	// Add support for native node modules
	{
		test: /\.node$/,
		use: 'node-loader',
	},
	{
		test: /\.(m?js|node)$/,
		parser: { amd: false },
		use: {
			loader: '@marshallofsound/webpack-asset-relocator-loader',
			options: {
				outputAssetBase: 'native_modules',
			},
		},
	},
	{
		test: /\.tsx?$/,
		exclude: /(node_modules|.webpack)/,
		loaders: [
			{
				loader: 'ts-loader',
				options: {
					transpileOnly: true,
					appendTsSuffixTo: [/\.vue$/],
				},
			},
		],
	},
	{
		test: /\.vue$/,
		loader: 'vue-loader',
		options: {
			loaders: {
				// Override the default loaders
			},
		},
	},
	{
		test: /\.scss$/i,
		use: [
			'vue-style-loader',
			// Creates `style` nodes from JS strings
			'style-loader',
			// Translates CSS into CommonJS
			'css-loader',
			// Compiles Sass to CSS
			'sass-loader',
		],
	},
];
