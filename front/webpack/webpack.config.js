// 경로에 대한 조회
const path = require("path");
// html webpack plugin: 번들러를 위한 html파일을 자동으로 만들어주고 설정해주는 플러그인
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 이전 bundle 파일들을 비워내는 플러그인
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// css파일이 html 외부에 따로 생성이 되도록 해주는 plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// css 압축을 위한 plugin 설정
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// terser(js 압축기)를 이용할 수 있게해주는 plugin
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./index.js",
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
    ],
  },
  plugins: [
    // css파일의 hash파일명 설정을 위한 플러그인
    new MiniCssExtractPlugin({
      // css파일도 hash값으로 설정
      // js파일만 수정된 경우 css파일도 hash값이 변경되는 것을 방지(contenthash 사용)
      filename: "[contenthash].css",
    }),
    // css 압축을 위한 플러그인 설정
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
    // template.html(hbs)을 가지고 output 번들파일과 연결해주어 자동으로 index.html을 생성해준다.
    new HtmlWebpackPlugin({
      title: "Webpack",
      template: "./template.hbs",
      meta: {
        viewport: "width=device-width, initial-scale=1.0",
      },
      // 번들결과로 나온 html파일 minification을 위한 설정
      minify: {
        collapseWhitespace: true,
        useShortDoctype: true,
        removeScriptTypeAttributes: true,
      },
    }),
    // hash된 이전 번들파일들을 제거해주는 역할
    new CleanWebpackPlugin(),
  ],
  // optimization: 쉽게 말해서 chunk분류하는데 최적화하는 작업 수행
  // runtime코드가 chunk로 따로 분류
  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    // build가 끝나고나서 압축이 진행(js)
    minimize: true,
    minimizer: [new TerserWebpackPlugin({
        // cache: true, // build가 반복적으로 진행될 때 변화가 없으면 caching된 결과를 사용(build 시간 단축), deprecated 된듯?
        // parallel: true,
    })] // 여기에 다른 plugin을 넣을 수 있다.(3개 js압축기 중)
  },
  mode: "none",
};

// css loader
// style loader
