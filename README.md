# vue-webpack-cli
wepack3 + vue2脚手架.  自用改造版.

原出处：https://github.com/SherwinChan/vue-webpack-template.

## Usage

这是一个基于vue-cli的项目模版. 为了生成有效依赖树，建议使用npm 3+。

install vue-cli:
```
$ npm install -g vue-cli
```

```
$ vue init Zper/vue-webpack-cli my-project
$ cd my-project
$ npm install
$ npm run dev
```

## 包含以下依赖

### webpack相关:
- webpack 3
- webpack-dev-server
- css-loader / style-loader
- file-loader / url-loader
- cross-env
- html-webpack-plugin
- extract-text-webpack-plugin
- copy-webpack-plugin

### babel相关:
- babel-loader
- babel-core
- babel-polyfill
- babel-preset-env
- babel-preset-stage-0/1/2/3
- babel-plugin-component
- babel-plugin-transform-runtime
- babel-plugin-transform-vue-jsx
- babel-plugin-syntax-jsx

### vue相关:
- vue
- vue-router 
- vuex
- axios
- vue-loader
- vue-template-compiler
- postcss-loader
- postcss-cssnext

### 其他(选装):
- lodash
- eruda
- ws