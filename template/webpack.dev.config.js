const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.js');
const fs = require('fs');
{{#ws}}const spawn = require('child_process').spawn;{{/ws}}

fs.open('./src/config/env.js', 'w', function (err, fd) {
  const buf = 'export default "development";';
  fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) {});
});

{{#ws}}
const ls = spawn('node', ['./server.js'], {
    detached: true,
    shell: true,
    stdio: 'ignore'
});

ls.unref();

ls.on('close', (code) => {
    console.log('child exists with code: ' + code);
});

ls.on('error', (err) => {
    console.log('启动子进程失败。');
});
{{/ws}}

module.exports = merge(webpackBaseConfig, {
  // devtool: '#source-map',
{{#eruda}}
  entry: {
    eruda: path.resolve(__dirname, './src/libs/eruda.js')
  },
{{/eruda}}
  output: {
    publicPath: '/dist/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/template/index.html'),
      inject: true, //scripte插入到body底部
      chunks: ['vendors', 'eruda', 'main'],
      chunksSortMode: 'manual'
      // minify: false,  //压缩 {...} | false
      // hash: true, //是否生成hash值，默认false
    }),
    // 在项目处生成一个html供localhost访问
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: path.resolve(__dirname, './src/template/index.html'),
      inject: true, //scripte插入到body底部
      // minify: false,  //压缩 {...} | false
      // hash: true, //是否生成hash值，默认false
    })
  ]
});