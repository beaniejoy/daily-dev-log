// 경로에 대한 조회
const path = require("path");
// html webpack plugin: 번들러를 위한 html파일을 자동으로 만들어주고 설정해주는 플러그인
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 이전 bundle 파일들을 비워내는 플러그인
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// css파일이 html 외부에 따로 생성이 되도록 해주는 plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// DefinePlugin을 불러오기 위한 모듈 호출
const webpack = require("webpack");
// production, development mode 상황에 따라 설정값 변경을 위한 변수 설정
const isProduction = process.env.NODE_ENV == "PRODUCTION";
// WINDOWS 환경: "SET NODE_ENV=DEVELOPMENT&&webpack --config webpack.dev.js"
// Linux 환경: "NODE_ENV=DEVELOPMENT webpack --config webpack.dev.js"

module.exports = {
  entry: "./src/index.js",
  output: {
    // hash contenthash chunkhash
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    // 브라우저별로 적용되는 user-agent 스타일을 통일시켜야한다. > normalize.css (한 개 더 있음)
    rules: [
      {
        test: /\.css$/i,
        use: [
          //   {
          // css 정보를 읽어들여 html내에 style태그를 만들어 css모듈에 대한 내용을 주입하는 loader
          //     loader: "style-loader",
          //     options: {
          //       injectType: "singletonStyleTag",
          //     },
          //   },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            // css파일을 모듈로 불러올 수 있는 환경 구성
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        // hbs(handlebars) 템플릿을 사용
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
      {
        // file-loader: file을 모듈로 받고 바로 출력해준다.
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              // name: "[contenthash].[ext]", // ext: 확장자
              name() {
                if (!isProduction) {
                  return "[path][name].[ext]";
                }

                return "[contenthash].[ext]";
              },
              publicPath: "assets/", // 파일 생성될 때 해당 이미지 모듈 경로 설정
              outputPath: "assets/", // build후에 output에서 지정한 경로에 저장
            },
          },
        ],
      },
      {
        // url-loader: file을 입력받고 문자열 변환형태로 반환
        // data:mediatype;base64,data (이런 형태로 반환)
        // resource 요청 수를 줄일 수 있다.
        test: /\.svg$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192, // byte 숫자단위(파일크기 제한)
          }
        }]
      },
    ],
  },
  plugins: [
    // css파일의 hash파일명 설정을 위한 플러그인
    new MiniCssExtractPlugin({
      // css파일도 hash값으로 설정
      // js파일만 수정된 경우 css파일도 hash값이 변경되는 것을 방지(contenthash 사용)
      filename: "[contenthash].css",
    }),
    // template.html(hbs)을 가지고 output 번들파일과 연결해주어 자동으로 index.html을 생성해준다.
    new HtmlWebpackPlugin({
      title: "Webpack",
      template: "./template.hbs",
      meta: {
        viewport: "width=device-width, initial-scale=1.0",
      },
      // 번들결과로 나온 html파일 minification을 위한 설정
      // dev일 때는 minify 설정 X
      minify: isProduction
        ? {
            collapseWhitespace: true,
            useShortDoctype: true,
            removeScriptTypeAttributes: true,
          }
        : false,
    }),
    // hash된 이전 번들파일들을 제거해주는 역할
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      IS_PRODUCTION: isProduction,
    }),
  ],
};
