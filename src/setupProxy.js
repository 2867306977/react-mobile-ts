// https://create-react-app.dev/docs/proxying-api-requests-in-development/
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // 当请求地址以/api开头，就会命中当前代理中间件
  // 代理中间件将请求转发到 target 服务器，同时将请求地址 /api 去掉
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
