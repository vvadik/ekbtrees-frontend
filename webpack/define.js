const {resolve} = require('path');
const src = resolve(__dirname, '../src');
const dist = resolve(__dirname, '../dist');

const environment = process.env.NODE_ENV;
const isDev = environment === 'development';
const isPro = environment === 'production';
const isTest = environment === 'test';

const pages = [
	'index',
	'login',
	'registration'
];

module.exports = {
	development: isDev,
	dist,
	environment,
	mode: environment === 'test' ? 'development' : environment,
	pages,
	production: isPro,
	src,
	test: isTest
};
