const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v1',
    createProxyMiddleware({
      target: 'http://localhost:9100',
      changeOrigin: true,
      pathRewrite: { '^/v1': '/v1' },
    })
  );
};
