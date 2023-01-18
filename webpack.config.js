// node JS style export for webpack

const path = require('path');  // core node js module

module.exports = {
    mode: 'development', 
    entry: './src/app.ts',
    output : {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist'

    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
        compress: true,
        port: 9002
    }
}