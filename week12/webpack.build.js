module.exports = {
  entry: {
    main: './lesson1/main.js'
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
              {pragma: 'ToyReact.createElement'}
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