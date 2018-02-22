const path = require('path')
const VirtualModulePlugin = require('virtual-module-webpack-plugin')

module.exports = content => ({
  context: path.resolve('client'),
  entry: [
    'index.js',
  ],
  output: {
    path: '/',
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
      path.resolve('client'),
      path.resolve('node_modules'),
    ],
  },
  plugins: [
    new VirtualModulePlugin({
      moduleName: 'src/Content.jsx',
      contents: content
    })
  ]
})
