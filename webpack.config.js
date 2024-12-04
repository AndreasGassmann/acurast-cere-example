const { resolve } = require("path");

module.exports = {
    entry: './src/server.ts',
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'out'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(html|js)$/,
                type: 'asset/source',
                exclude: /node_modules/
            }
        ],
    },
    target: "node",
};