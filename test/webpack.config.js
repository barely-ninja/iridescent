const path = require('path')

module.exports = ({
  //mode: 'development',
  context: path.resolve('../client'),
  entry: [
    'index.js',
  ],
  output: {
    path: path.resolve('./static'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js[x]$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.resolve('../client'),
      path.resolve('../node_modules'),
    ],
  }
})
