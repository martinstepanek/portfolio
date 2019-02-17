const path = require('path');
const HWP = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');


module.exports = (env, argv) => {

    let plugins = [
        new HWP({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
    ];

    if (argv.mode === 'production') {
        plugins.push(new PurifyCSSPlugin({
            paths: [path.join(__dirname, 'dist/index.html')],
        }));
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
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }]
                },
                
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