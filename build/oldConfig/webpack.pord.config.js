const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const utils = require("./utils");
const baseConfig = require("./webpack.base.config");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
baseConfig.mode = "production";
// baseConfig.rules = utils.styleLoaders({
//     sourceMap: false,
//     extract: true,
//     usePostCSS: true
// });

baseConfig.plugins.push(
    ...[
        new UglifyJsPlugin(),
        new OptimizeCSSPlugin({
            safe: true,
            map: {
                inline: false
            }
        })
    ]
);
