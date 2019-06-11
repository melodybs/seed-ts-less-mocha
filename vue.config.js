const backend = require('./build/dev-server')

module.exports = {
  // configureWebpack: {
  devServer: {
    before: backend
  }
  // }
  /* API 프락시 (https://cli.vuejs.org/config/#devserver-proxy)
  # 개발 중에는 운영용 서버를 사용할수 없거나, API가 확정되지 않아 실제 서버 사용이 어려움
    -> 서버를 대체해 개발 (Ex: 목업서버, 로컬 백 엔드, API 통신 목업 모듈) -> 구현 어려움
  # webpack 템플릿으로 생성한 프로젝트는 개발환경(development)에 개발서버를 갖추고 있어 이를 사용 가능.
    -> 나중에는 이 개발 서버가 제공하는 백 엔드 프락시로 전환. (이런 방법으로 실제 백 엔드 API를 사용 가능하도록 언제든 전환 가능)
  # http-proxy-middleware (https://github.com/chimurai/http-proxy-middleware#proxycontext-config)
    -> 개발환경에서 제공하는 API 프락시 기능엥서 개발서버는 익스프레스 미들웨어 사용. 이 미들웨어의 옵션 설정을 사용 가능.
  devServer: {
    before: backend,
    // '/api'로 시작하는 모든 요청은 'api.yourservice.com'으로 프락싱
    proxy: {
      '/api': {
        target: 'http://api.yourservice.com', // target host
        ws: true, // proxy websockets
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
  */
}
