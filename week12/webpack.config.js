module.exports = {
  entry: {
    main: './main.js'
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: '8888',
    open: true,
    //index: './main.html'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [[
              '@babel/plugin-transform-react-jsx',
              {pragma: 'createElement'}
            ]]
          }
        }
      }
    ]
  },
  mode: 'development',
  devtool: 'source-map',
  optimization: {
    minimize: false,
  }
}