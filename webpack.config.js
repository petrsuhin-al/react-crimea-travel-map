const path = require("path"),
      webpack = require("webpack"),
      uglifyJsPlugin = require('uglifyjs-webpack-plugin'),
      autoprefixer = require('autoprefixer'),
      CompressionWebpackPlugin = require('compression-webpack-plugin'),
      dotenv = require('dotenv');

const babelSettings = {  // настройки бэбла
    "presets" : [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "plugins": [
        "react-hot-loader/babel",
        "@babel/plugin-proposal-class-properties",
    ]
};

module.exports = (opts) => {
    let entry = [ './client/main.js'];
    let jsxLoaders = [
        "babel-loader?" + JSON.stringify(babelSettings),
        // "astroturf/loader"
    ];

    const env = dotenv.config().parsed;
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    let plugins = [
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.jsx$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new webpack.DefinePlugin(envKeys)
    ];

    if (opts.devServer = true) {
        jsxLoaders.unshift("react-hot-loader/webpack");
        entry.unshift(
            'webpack-dev-server/client?http://localhost:8090',
            'webpack/hot/only-dev-server'                       // "only" предотвращает перезагрузку синтаксических ошибок
        );
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    return {
        devtool: "cheap-module-source-map",
        entry: entry,
        output: {
            path: path.join(__dirname, "public/build/"),
            publicPath: "/",
            filename: "bundle.js",
        },

        devServer: {
            headers: {"Access-Control-Allow-Origin": "*"}
        },

        plugins: plugins,

        optimization: {
            // splitChunks: {
            //     chunks: 'all'
            // },
            minimizer: [
                new uglifyJsPlugin({
                    test: /\.(jsx|js)?$/i,
                    cache: true,
                    parallel: true,
                    sourceMap: true,
                    uglifyOptions: {
                        output: {
                            comments: false,
                            beautify: false,
                        },
                        compress: {
                            sequences: true,
                            booleans: true,
                            loops: true,
                            unused: true,
                            warnings: false,
                            drop_console: false,
                            unsafe: true
                        }
                    }
                })
            ]
        },

        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'postcss-loader'],
                },
                {
                    test: /\.(scss|.css)?$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins() {
                                    return [autoprefixer('last 2 version')];
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        }
                    ]
                },
                {
                    test: /\.(jsx|js)?$/i, // /\.jsx?$/
                    use: jsxLoaders,
                    exclude: /node_modules/,
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        'file-loader',
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                bypassOnDebug: true,
                                disable: true,
                            },
                        },
                    ],
                }
            ]
        },

        resolve: {
            extensions: ['.js', '.jsx'],
        },
    };
};