const path = require('path');
const HWP = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');


module.exports = (env, argv) => {

    let plugins = [
        new HWP({
            template: './public/index.html',
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new FaviconsWebpackPlugin({
            logo: path.join(__dirname, 'public/images/logo.png'),
            title: 'Martin Štěpánek',
        })
    ];

    if (argv.mode === 'production') {
        plugins.push(new PurifyCSSPlugin({
            paths: [path.join(__dirname, 'public/index.html')],
        }));
        plugins.push(
            new HtmlCriticalWebpackPlugin({
                base: path.resolve(__dirname, 'dist'),
                src: 'index.html',
                dest: 'index.html',
                inline: true,
                minify: true,
                extract: true,
                width: 375,
                height: 565,
                penthouse: {
                    blockJSRequests: false,
                }
            })
        );
    }

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'build.js',
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: argv.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader
                        }, {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        }, {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                includePaths: ['/scss']
                            },

                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /(untitled-font-1\.svg|\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$)/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }]
                },
                {
                    test: /\.htaccess/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name]',
                        }
                    }]
                },
                {
                    test: /\.(txt|xml)$/i,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        }
                    }]
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    exclude: /scss\/fonts\/untitled-font-1\.svg/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                            },
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                // optipng.enabled: false will disable optipng
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: '65-90',
                                    speed: 4
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                // the webp option will enable WEBP
                                webp: {
                                    quality: 75
                                }
                            }
                        },
                    ],
                }
            ]
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: false,
                    uglifyOptions: {
                        output: {
                            comments: false
                        }
                    }
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        },
        plugins: plugins,
        devServer: {
            port: 3000,
            historyApiFallback: {
                index: './public/index.html'
            }
        }
    };
};