const { merge } = require("webpack-merge");
// 공통으로 사용하는 webpack 설정
const common = require("./webpack.common");

const config = {
  mode: "development",
  devServer: {
    open: false, // 새로운 탭으로 실행
    overlay: true, // error발생시 브라우저에서 표시(매세지는 안나온다.)
    // routing과 관련,
    historyApiFallback: {
      rewrites: [
        { from: /^\/subpage$/, to: "/subpage.html" }, // /를 붙여야 한다.
        { from: /./, to: "/404.html" }, // 따로 지정한 경로 외의 모든 경로
      ],
    }, // true, 객체 설정가능
    port: 3333
  },
};

module.exports = merge(common, config);