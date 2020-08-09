module.exports = {
    mode: "development",
    entry: "./src/matchSelector.js",
    output: {
        filename: "bundle.js",
        
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 9000
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],                      
                    }
                }
            }
        ]
    }
}