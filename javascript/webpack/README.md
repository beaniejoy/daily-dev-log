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
