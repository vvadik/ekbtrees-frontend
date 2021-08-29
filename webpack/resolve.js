const {resolve} = require('path');
const {src} = require('./define');

module.exports = {
	alias: {
		'components': resolve(src, 'components'),
		'context': resolve(src, 'context'),
		'helpers': resolve(src, 'helpers'),
		'img': resolve(src, 'img'),
		'package.json': resolve(src, '../package.json'),
	},
	extensions: ['.js', '.jsx']
};
