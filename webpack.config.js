/**
 * 测试环境，打包时使用到的配置文件
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin'); // html-webpack-plugin插件，webpack中生成HTML的插件
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // extract-text-webpack-plugin插件，可以将你的样式提取到单独的 css文件里
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'), // 编译完成后的输出目录
        filename: '[name].[hash:8].js'
    },

    resolve: {
        extensions: ['.js', '.jsx'] // 在引入模块时不带扩展
    },

    // 引入 loaders
    module: {
        rules: [
            {
                // 解析 css,css-loader less,less-loader
                test: /\.(css|less)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true // 压缩CSS
                            }
                        },
                        {
                            loader: 'postcss-loader' // 使用 postcss-loader 需要单独创建 postcss.config.js 放入配置信息
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                // SASS的.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        "css-loader",
                        "sass-loader"
                    ]
                })
            },
            {
                // 处理图片
                test: /\.(png|gif|jpg|jpeg|bmp)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5000 // 限制大小5kb，将小于 5KB 文件转换成 Base64，减少网页请求次数
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5000 // 限制大小5kb，将小于 5KB 文件转换成 Base64，减少网页请求次数
                    }
                }
            },
            {
                // 编译es6
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // babel-loader?cacheDirectory=true
                }
            }
        ]
    },

    // eslint: {
    //     configFile: '.eslintrc' // Rules for eslint
    // },
    //

    plugins: [
        // // 版权插件
        // new webpack.BannerPlugin('版权所有，翻版必究'),

        // html 模板插件，将 html打包压缩，每个对于一个页面的配置，有几个写几个
        new HtmlWebpackPlugin({
            favicon: './public/favicon.ico', // favicon路径，通过webpack引入同时可以生成hash值
            template: __dirname + '/public/index.html', // html模板路径
            // filename: '/index.html', // 生成的html存放路径，相对于 path
            // chunks: ['vendors', 'src'], // 区分要加载的js，名字要跟entry入口定义的保存一直
            // inject: true, // 允许插件修改哪些内容，包括head与body js插入的位置，true/'head'/'body'/false
            // hash: true, // 为静态资源生成hash值，可以实现缓存
            // minify: { // 压缩代码
            //     removeComments: true, // 移除HTML中的注释
            //     collapseWhitespace: true // 删除空白符与换行符
            // }
        }),

        // 热加载插件
        new webpack.HotModuleReplacementPlugin(),

        // 单独使用link标签加载css并设置路径，相对于 output 配置中的 publickPath
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            disable: false,
            allChunks: true,
        }),

        // // 压缩代码
        // new webpack.optimize.MinChunkSizePlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),

        // // vendor
        // // 将第三方依赖单独打包。即将 node_modules 文件夹中的代码打包为 vendor.js 将我们自己写的业务代码打包为 src.js。这样有助于缓存，
        // // 因为在项目维护过程中，第三方依赖不经常变化，而业务代码会经常变化
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor', // 将公共模块提取，生成名为`vendors`的chunk.就是将vendor里面的文件压缩成一个文件
        //     // chunks: ['react','react-dom','jquery','react-tappable','underscore','react-router'], chunks 提取哪些模块共有的部分,跟vendor是一样的
        //     minChunks: Infinity // 提取至少*个模块共有的部分
        // }),

        // new webpack.optimize.OccurrenceOrderPlugin(),

        // 运行项目后，自动打开浏览器的访问地址
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        }),

        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式 (dev模式下可以提示错误、测试报告等, production模式不提示)
        // NODE_ENV 在 package.json 中 scripts 的 start 指令中定义
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
    ],

    // 使用 webpack-dev-server，提高开发效率
    devServer: {
        // port: 8080, // 设置端口默认是 8080
        // overlay: true, // 在编译出错的时候，是否在浏览器页面上显示错误信息
        proxy: {
            // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据
            // koa 代码在 ./mock 目录中，启动命令为 npm run mock
            '/api': {
                target: 'http://localhost:3000',
                secure: false
            }
        },
        contentBase: path.join(__dirname, "build"), // 本地服务器所加载的页面所在的目录
        colors: true, // 终端中输出结果为彩色
        historyApiFallback: true, // 不跳转
        // historyApiFallback:{ // 返回404页面时定向到特定页面
        //     rewrites:[
        //         {from:/./,to:'/404.html'}
        //     ]
        // }
        inline: true, // 实时刷新
        hot: true // 使用热加载插件 HotModuleReplacementPlugin
    }
};
