const webpack = require('webpack')
const path = require('path')
const WebPackBaseConfig = require('./webpack.base.conf.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebPackMerge = require('webpack-merge')

module.exports = WebPackMerge(WebPackBaseConfig, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, '../dist'), 
        publicPath: '/',       
        compress: true,
        port: 2019,
        host: '0.0.0.0',
        hot: true,
        proxy:{
            '*': {
                target: 'http://localhost:2020',
                changeOrigin: true
            }
        },
        overlay: {
            warnings: false,
            errors: true
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
})