const {development, dist, mode, pages, src} = require('./define');
const loaders = require('./loaders');
const localIp = require('my-local-ip');
const optimization = require('./optimization');
const plugins = require('./plugins');
const resolve = require('./resolve');

const outputFilename = ext => `${development ? `` : `[hash].`}[name].${ext}`;

const entries = {
	'10_global': ['babel-polyfill', './global.js']
};

pages.forEach(page => {
	entries[`30_${page}`] = [`./entries/${page}.js`];
});

module.exports = {
	context: src,
	devServer: {
		host: localIp(),
		port: 8083
	},
	devtool: development ? 'inline-source-map' : false,
	entry: entries,
	mode,
	module: loaders,
	optimization,
	output: {
		filename: outputFilename('js'),
		path: dist,
	},
	plugins,
	resolve
};
