const { merge } = require("webpack-merge");
const common = require("./webpack.common");

// css 압축을 위한 plugin 설정
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// terser(js 압축기)를 이용할 수 있게해주는 plugin
const TerserWebpackPlugin = require("terser-webpack-plugin");

const config = {
  plugins: [
    // css 압축을 위한 플러그인 설정
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
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
    minimizer: [
      new TerserWebpackPlugin({
        // cache: true, // build가 반복적으로 진행될 때 변화가 없으면 caching된 결과를 사용(build 시간 단축), deprecated 된듯?
        // parallel: true,
      }),
    ], // 여기에 다른 plugin을 넣을 수 있다.(3개 js압축기 중)
  },
  mode: "production",
};

module.exports = merge(common, config);
