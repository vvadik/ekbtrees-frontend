const {development, production, test} = require('./define');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const outputFilename = ext => `${development ? `` : `[hash].`}[name].${ext}`;

const minimizer = production || test
	? [
		new UglifyJsPlugin({
			cache: false
		})
	]
	: [];

const splitChunks = {
	chunks: 'all',
	filename: outputFilename('js'),
	minChunks: 2,
	name: '20_commons'
};

const optimization = {
	minimizer,
	splitChunks
};

module.exports = optimization;
