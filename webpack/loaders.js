const Autoprefixer = require('autoprefixer');
const {development} = require('./define');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	rules: [
		{
			exclude: /node_modules/,
			test: /\.jsx?$/,
			use: {
				loader: 'babel-loader'
			}
		},
		{
			test: /\.(css|less)$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader
				},
				{
					loader: 'css-loader',
					options: {
						modules: {
							localIdentName: '[name]__[local]',
							mode: 'global'
						},
						sourceMap: development,
						url: true
					}
				},
				{
					loader: 'postcss-loader',
				 	options: {
				 		plugins: [
				 			new Autoprefixer({
				 				browsers: [
				 					'>1%',
				 					'last 3 versions',
									'ie > 8'
				 				]
				 			})
				 		],
				 		sourceMap: development
				 	}
				},
				{
					loader: 'less-loader',
					options: {
						relativeUrls: true,
						sourceMap: development
					}
				}
			]
		},
		{
			loader: 'url-loader',
			test: /\.(svg|gif)$/
		},
		{
			test: /\.(png|woff|woff2|ttf|eot)$/,
			use: {
				loader: 'file-loader',
				options: {
					name: '[name]-[hash:11].[ext]'
				}
			}
		}
	]
};
