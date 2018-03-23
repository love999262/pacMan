const webpack = require('webpack');
const path = require('path');
const ENV = process.env.NODE_ENV;
const config = {
    entry: {
        main: path.resolve(__dirname, './src/app.ts'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/assets/',
        filename: 'bundle.min.js',
    },
    devServer: {
        contentBase: './dist/',
        historyApiFallback: true,
        inline: true,
        host: 'localhost',
        port: 8080,
        open: true,
        openPage: 'webpack-dev-server/index-dev.html',
    },
    devtool: (ENV === 'dev' || ENV === 'watch') ? 'eval-source-map' : 'inline-source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        }, {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
                'babel-loader',
                'ts-loader',
                'tslint-loader',
            ],
        }, {
            enforce: 'pre',
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
        }, {
            test: /\.(png|jpg|gif|ttf|eot|svg|woff)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: { limit: 819200 }
                }
            ]
        }]
    },
    watchOptions: {
        ignored: [/node_modules/]
    },
};

module.exports = config;