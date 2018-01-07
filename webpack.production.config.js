/**
 * 生产环境，打包时使用到的配置文件
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin'); // html-webpack-plugin插件，webpack中生成HTML的插件
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // extract-text-webpack-plugin插件，可以将你的样式提取到单独的 css文件里

// 建议将 [hash:8] 建议修改成 [chunkhash:8]，这样就可以根据版本号获取 hash 值
module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/index.jsx'),
        // 将 第三方依赖 单独打包
        vendor: [
            'es6-promise',
            'immutable',
            'prop-types',
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'react-scripts',
            'react-swipe',
            'redux',
            'swipe-js-iso',
            'whatwg-fetch'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // 编译完成后的输出目录
        filename: "[name].[hash:8].js",
        publicPath: '/'
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
                test: /\.(png|gif|jpg|jpeg|bmp)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5000, // 限制大小5kb，将小于 5KB 文件转换成 Base64，减少网页请求次数
                        name: 'img/[name].[hash:8].[ext]'
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)($|\?)/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5000, // 限制大小5kb，将小于 5KB 文件转换成 Base64，减少网页请求次数
                        name: 'fonts/[name].[hash:8].[ext]'
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

    plugins: [
        // 版权插件 ; webpack 内置的 banner-plugin
        new webpack.BannerPlugin("Copyright by https://github.com/chenshun131."),

        // html 模板插件，将 html打包压缩，每个对于一个页面的配置，有几个写几个
        new HtmlWebpackPlugin({
            favicon: './public/favicon.ico', // favicon路径，通过webpack引入同时可以生成hash值
            template: __dirname + '/public/index.html', // html模板路径
            chunks: ['vendors', 'src'], // 区分要加载的js，名字要跟entry入口定义的保存一直
            inject: true, // 允许插件修改哪些内容，包括head与body js插入的位置，true/'head'/'body'/false
            hash: true, // 为静态资源生成hash值，可以实现缓存
            minify: { // 压缩代码
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true // 删除空白符与换行符
            }
        }),

        // 定义为生产环境，编译 React 时压缩到最小
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),

        // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.OccurrenceOrderPlugin(),

        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            compress: {
                warnings: false // 输出不显示警告
            },
            output: {
                comments: false // 输出去掉注释
            }
        }),

        // 分离CSS和JS文件，单独使用link标签加载css并设置路径，相对于 output 配置中的 publickPath
        new ExtractTextPlugin({
            filename: 'css/[name].[hash:8].css',
            disable: false,
            allChunks: true
        }),

        // 提供公共代码，将第三方依赖单独打包，第三方依赖不经常变化，这样有助于缓存
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', // 将公共模块提取，生成名为`vendors`的chunk.就是将vendor里面的文件压缩成一个文件
            filename: '[name].[hash:8].js',
            // chunks: ['react','react-dom','jquery','react-tappable','underscore','react-router'], chunks 提取哪些模块共有的部分,跟vendor是一样的
            minChunks: Infinity // 提取至少*个模块共有的部分
        }),

        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
    ]
};