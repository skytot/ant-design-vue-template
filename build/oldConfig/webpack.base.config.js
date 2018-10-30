const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
function resolve(dir) {
    return path.join(__dirname, "..", dir);
}
module.exports = {
    entry: "./src/index.js",
    // 输出
    output: {
        // 输出路径
        path: path.resolve(__dirname, "./dist"),
        // 输出文件名
        filename: "[name]-build.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loader: "css-loader",
                    options: {
                        sourceMap: false
                    }
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: [
                    resolve("src"),
                    resolve("test"),
                    resolve("node_modules/webpack-dev-server/client")
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: true
        })
    ]
};
