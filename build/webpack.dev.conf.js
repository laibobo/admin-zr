const webpack = require('webpack')
const path = require('path')
const WebPackBaseConfig = require('./webpack.base.conf.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebPackMerge = require('webpack-merge')

module.exports = WebPackMerge(WebPackBaseConfig, {
    devtool: 'inline-source-map',
    devServer: {
        // 告诉服务器从哪个目录中提供内容
        contentBase: path.join(__dirname, 'dist'),
        // 启用 gzip 压缩
        compress: true,
        port: 8099,
        // 默认是 localhost。如果希望服务器外部可访问,则设置为0.0.0.0
        host: '0.0.0.0',
        // 启用热替换模块  必须配置 webpack.HotModuleReplacementPlugin
        hot: true
    },
    plugins: [
        // 清理文件夹
        new CleanWebpackPlugin(),
        // 启用热替换模块
        new webpack.HotModuleReplacementPlugin(),
        // 启用HMR时,插件将显示模块的相对路径
        new webpack.NamedModulesPlugin()
    ]
})