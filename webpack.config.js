const path = require('path');
const HWP = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
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
                        loader:  MiniCssExtractPlugin.loader
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
        ]
    },
    plugins: [
        new HWP({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new PurifyCSSPlugin({
            paths: [path.join(__dirname, 'dist/index.html')],
        })
    ],
    devServer: {
        port: 3000,
        historyApiFallback: {
            index: './public/index.html'
        }
    }
};