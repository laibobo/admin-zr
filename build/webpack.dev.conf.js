const webpack = require('webpack')
const path = require('path')
const WebPackBaseConfig = require('./webpack.base.conf.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebPackMerge = require('webpack-merge')

module.exports = WebPackMerge(WebPackBaseConfig, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8099,
        host: '0.0.0.0',
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
})