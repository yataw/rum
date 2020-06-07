const path = require('path');

module.exports = {
    entry: './index.js',
    mode: 'production',
    watch: true,
    // devtool: 'inline-source-map',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx'
        ]
    }
};