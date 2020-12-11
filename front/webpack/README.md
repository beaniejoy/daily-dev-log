# Webpack

<p><img src="https://user-images.githubusercontent.com/41675375/99358907-8f386800-28f1-11eb-82dd-2039a0c0254f.png" width="380" height="150"></p>
  
📚 Webpack 개념을 문서와 코드로 정리한 정리노트 📚

<br>

- [webpack doc](https://webpack.js.org/concepts/)

<br>

## 🏷️ Contents

```
Webpack
├── **webpack.common.js > webpack 공통 설정
├── **webpack.dev.js    > dev mode 설정
├── **webpack.prod.js   > prod mode 설정
├── webpack.config.js   > 기본 설정 내용
├── template.hbs        > build를 위한 뼈대 문서
├── src                 > source 파일
    ├── index.js        > entry 시작 js파일
    └── index.css       > css 파일
```

<br>

## 🏷️ 필기사항

### bundling
```
$ npm run dev       > 'dev mode'
$ npm run build     > 'prod mode'
```

### dev server run

```
$ npm start
```
```
> SET NODE_ENV=DEVELOPMENT&&webpack serve --config webpack.dev.js
```
`webpack-dev-server` > `webpack serve` (change command)

### Windows based Command
```cmd
> SET NODE_ENV=DEVELOPMENT&&webpack --config webpack.dev.js
> SET NODE_ENV=PRODUCTION&&webpack --config webpack.prod.js
```

### Linux based Command
```
$ NODE_ENV=DEVELOPMENT webpack --config webpack.dev.js
$ NODE_ENV=PRODUCTION webpack --config webpack.prod.js
```

<br>

## 🏷️ Issues

### webpack5 auto polyfill 제거
- [webpack5 무엇이 달라졌나](https://so-so.dev/webpack/whats-different-in-webpack5/)
- [How to setup polyfill in webpack5](https://sanchit3b.medium.com/how-to-polyfill-node-core-modules-in-webpack-5-905c1f5504a0)

webpack5에서는 더이상 `@babel/polyfill`을 `webpack.config.js`에 설정할 필요가 없다.

```
$ npm i 
    assert 
    buffer 
    console-browserify 
    constants-browserify 
    domain-browser 
    events 
    stream-http 
    https-browserify 
    os-browserify 
    path-browserify
    punycode 
    process 
    querystring-es3 
    stream-browserify 
    readable-stream 
    string_decoder util 
    timers-browserify 
    tty-browserify 
    url 
    vm-browserify 
    browserify-zlib
```
```js
// webpack.config.js
const webpack = require('webpack')

//...

plugins: [

        //...

        new webpack.ProvidePlugin({
            process: 'process/browser'
        })
    ],
```