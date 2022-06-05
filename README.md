## package.json 部分说明
```js
"devDependencies":{
    // -- START 将 ES6+ 转 ES5
    "@babel/core": "^7.17.10",
    "@babel/preset-env": "^7.17.10",
    "babel-loader": "^8.2.5",

    "path": "^0.12.7",
    "webpack": "^5.72.1",
    "webpack-cli": "^4.9.2",

    // -- START  style-loader css-loader less less-loader 由于 webpack 默认只能打包处理 commonJs 规范的 js 文件，处理其他文件都需要相对应的处理器进行处理。
    "css-loader": "^6.7.1",
    "less": "^4.1.2",
    "less-loader": "^10.2.0",
    "style-loader": "^3.3.1",

    // -- START 同理，处理图片等静态资源,除 js 文件的其他文件打包 webpack 都需特定的处理器进行处理。
    "url-loader": "^4.1.1",
    "file-loader": "^6.2.0",

    // --START 创建 html 文件 让打包的 js 文件自动的插入到html模板中
    "html-webpack-plugin": "^5.5.0",

    // --START 开发服务器 每次打包后都需要手动的点击生成的 index.html 可以让 webpack 将打包后的文件自动在浏览器打开
    "webpack-dev-server": "^4.9.0",

    // --START 清除打包文件 若打包的文件加了 hash，那每次打包生成的文件都会 dist 目录保留，我们可以使用此插件帮助我们每次打包前先清除以前的打包文件。
    "clean-webpack-plugin": "^4.0.0",

    // --START 配置环境变量
    "cross-env": "^7.0.3",

    // --START 压缩 css 文件
    "mini-css-extract-plugin": "^2.6.0",
    "optimize-css-assets-webpack-plugin": "^6.0.1",
    // --START 压缩 js 文件
    "terser-webpack-plugin": "^5.3.1",

    // --START 压缩图片 一个 plugin 一个 loader
    "image-webpack-loader": "^8.1.0",
    "imagemin-webpack-plugin": "^2.4.2",

    // --START 集成Typescript
    "ts-loader": "^9.3.0",
    "typescript": "^4.6.4",

    // --START 配置环境变量
    "cross-env": "^7.0.3",

    // --START webpack 打包分析
    "webpack-bundle-analyzer": "^4.5.0",
}

"dependencies": {
    // --START 识别 .vue文件 , Vue2.x 用的 vue-template-complier
    "@vue/compiler-sfc": "^3.2.33",
    "vue": "^3.2.33",
    "vue-loader": "^17.0.0"
    
    "vue-router": "^4.0.15"
}
```