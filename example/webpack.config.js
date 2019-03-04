module.exports = {
    entry: './src/index.js',

    output: {
        path: __dirname + '/dist',
        filename: 'index.js',
    },

    mode: "development",

    resolve: {
      extensions: ['.js'],
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    { loader: "babel-loader"}
                ],
                exclude: /node_modules/
            }, {
                test: /\.html$/,
                use: [
                    { loader: "file-loader", options: { name: "[name].html" } },
                    { loader: "extract-loader" },
                    { loader: "html-loader", options: { attrs: [ "img:src" ] } },
                ]
            }
        ]
    }
};
