const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    mode: process.env.NODE_ENV || 'production',
    entry: path.join(__dirname, '../src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: isDev
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: isDev
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: [path.resolve(__dirname, '../src/assets/icons')],
                options: {
                    symbolId: 'icon[name]'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader?name=images/[name]-[contenthash:7].[ext]&limit=10000',
                exclude: [path.resolve(__dirname, '../src/assets/icons')]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader'
            },
            {
                test: /\.js$/,
                use: [
                    'cache-loader',
                    'babel-loader?cacheDirectory'
                ],
                exclude: '/node_modules/',
                include: path.resolve(__dirname, '../src')
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'index',
            template: path.join(__dirname, '../src/index.html'),
            favicon: path.join(__dirname, '../favicon.ico')
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    resolve: {
        extensions: ['.vue', '.js', '.css', '.sass'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '~': path.resolve(__dirname, '../src'),
            'config': path.resolve(__dirname, '../config')
        }
    }
}