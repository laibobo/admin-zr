const webpack = require('webpack')
const path = require('path')
const WebPackMerge = require('webpack-merge')
const WebPackBaseConfig = require('./webpack.base.conf.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const Glob = require('glob-all')
const PurifyCSSPlugin = require('purifycss-webpack')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")

const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap(WebPackMerge(WebPackBaseConfig, {
    output: {
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash:5].js',
        path: path.resolve(__dirname, '../dist')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                libs: {
                    name: "chunk-libs",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial" // 只打包初始时依赖的第三方
                },
                elementUI: {
                    name: "chunk-elementUI", // 单独将 elementUI 拆包
                    priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                    test: /[\\/]node_modules[\\/]element-ui[\\/]/
                },
                commons: {
                    name: "chunk-commons",
                    test: path.resolve("../src/components"), // 可自定义拓展你的规则
                    minChunks: 2, // 最小共用次数
                    priority: 5,
                    reuseExistingChunk: true
                }
            }
        },
        runtimeChunk: true,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[contenthash].css'
        }),
        new PurifyCSSPlugin({
            paths: Glob.sync([
                path.join(__dirname, '../src/')
            ]),
            purifyOptions: {
                whitelist: ['*purify*']
            }
        })
    ]
}))