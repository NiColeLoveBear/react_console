const path=require('path');
const {stylelintPlugin, htmlPlugin}=require('../config');

module.exports={
  mode: 'development',
  output: {
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../'),
    compress: true,
    port: 3000,
    open: true,
    disableHostCheck: true,
    proxy: {
      '/api': 'http://localhost:8080/',
      '/admin': 'http://localhost:8080/',
    }
  },
  plugins: [
    ...stylelintPlugin,
    htmlPlugin
  ]
};
