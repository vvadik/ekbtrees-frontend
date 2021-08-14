const {development, pages, production, test} = require('./define');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const {version} = require('../package.json');
const currentYear = (new Date()).getFullYear() + 1;

const cssOutputFilename = () => `${development ? `` : `[contenthash].`}[name].css`;
const sortChunks = (a, b) => a.names[0] < b.names[0] ? -1 : 1;

const plugins = [];

plugins.push(
	new webpack.DefinePlugin({
		'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}
	}),
	new MiniCssExtractPlugin({
		filename: cssOutputFilename()
	}),
);

const env = {
	Prod: production || test
};

pages.forEach(page => {
	plugins.push(
		new HtmlWebpackPlugin({
			chunks: ['10_global', '20_commons', `30_${page}`],
			chunksSortMode: sortChunks,
			env,
			filename: `${page}.html`,
			meta: {
				currentYear,
				version
			},
			template: '../src/index.html'
		})
	);
});

module.exports = plugins;
