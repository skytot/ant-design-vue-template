'use strict'
process.traceDeprecation = true
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const env = require('../config/prod.env')
function tmpBuild() {
    const path = 'index.html'
    return path;
}
const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    performance: {
        hints: false
    },
    module: {
        rules: utils.styleLoaders({sourceMap: config.build.productionSourceMap, extract: true, usePostCSS: true})
    },
    devtool: config.build.productionSourceMap
        ? config.build.devtool
        : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true, parallel: true, sourceMap: false, // set to true if you want JS source maps,
                uglifyOptions: {
                    warnings: false,
                    compress: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true
                    }
                }
            }),
            new OptimizeCSSPlugin({
                cssProcessorOptions: config.build.productionSourceMap
                    ? {
                        safe: true,
                        map: {
                            inline: false
                        }
                    }
                    : {
                        safe: true
                    }
            })
        ],
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 10,
            maxInitialRequests: 5,
            name: false,
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'async',
                    priority: -10,
                    minSize: 0,
                    reuseExistingChunk: true,
                    test: /node_modules\/(.*)\.js/
                },
                styles: {
                    name: 'styles',
                    test: /\.(scss|css)$/,
                    chunks: 'all',
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        // extract css into its own file
        // new ExtractTextPlugin({
        //   filename: utils.assetsPath('css/[name].[contenthash].css'),
        //   allChunks: true,
        // }),
        new webpack.DefinePlugin({'process.env': env}),
        new MiniCssExtractPlugin({
            filename: 'css/app.[name].css', chunkFilename: 'css/app.[contenthash:8].css' // use contenthash *
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: tmpBuild(),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ]),
        // new WebpackDeepScopeAnalysisPlugin(), 深度代码抽取插件
    ]
})
if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')
    webpackConfig.plugins.push(new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
    }))
}
if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = webpackConfig