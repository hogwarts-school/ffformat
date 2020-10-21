const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'amd'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, './tsconfig.prod.json')
            }
          }
        ],
        exclude: ['/node_modules/']
      }
    ]
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@constant': path.resolve(__dirname, 'src/constant'),
      '@dataFormat': path.resolve(__dirname, 'src/dataFormat'),
      '@creator': path.resolve(__dirname, 'src/creator'),
      '@utils': path.resolve(__dirname, 'src/utils')
    },
    extensions: ['.ts', '.js']
  }
};
