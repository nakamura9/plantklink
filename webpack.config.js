var path = require("path");
var webpack = require("webpack");
var BundleTracker = require("webpack-bundle-tracker");

module.exports = {
    context: __dirname,
    entry:  {
        main: './assets/js/index',
        dashboard: './assets/js/dashboard/dash_index',
        scada: './assets/js/scada/creator',
        running_dash: './assets/js/running_dash/dash_index'
    },
    
    output: {
        path: path.resolve('./assets/bundles/'),
        filename: '[name].js',
    },
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'})
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react']
                }
            }
        ]
    },

    resolve: {
        extensions: [ '.js', '.jsx']
    }
}