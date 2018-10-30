const webpack = require("webpack");
const baseConfig = require("./webpack.base.config");
const path = require("path");
// 开发模式
baseConfig.mode = "development";
// 方便追踪源代码中的错误
baseConfig.devtool = "#eval-source-map";
// 服务配置
baseConfig.devServer = {
    clientLogLevel: "warning",
    historyApiFallback: {
        rewrites: [
            {
                from: /.*/,
                to: path.posix.join("/", "index.html")
            }
        ]
    },
    // 发布服务的文件夹
    host: "192.168.2.110",
    port: 8080,
    // 声明为热替换
    hot: true,
    // 第一次打包时打开浏览器
    open: true,
    // 与output中的内容保持一致
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    publicPath: "/"
};
baseConfig.plugins.push(
    ...[
        new webpack.NamedModulesPlugin(),
        // 热替换插件
        new webpack.HotModuleReplacementPlugin()
        // 将webpack-dev-server在内存中打包的文件输出为本地文件
    ]
);
module.exports = baseConfig;
