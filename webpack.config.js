var config = {
    entry: './app/main.js',

    output: {
        path:'./',
        filename: 'index.js',
    },

    devServer: {
        inline: true,
        port: 3000
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    }
}

module.exports = config;
