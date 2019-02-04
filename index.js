module.exports = function webpackHook(sails) {
  if (process.env.NODE_ENV === 'production') return {}

  return {
    configure () {
      const webpack = require('webpack')
      const webpackDevMiddleware = require('webpack-dev-middleware')
      const webpackHotMiddleware = require('webpack-hot-middleware')
      const webpackConfig = sails.config.webpack
      const compiler = webpack(webpackConfig)
      const middleware = sails.config.http.middleware

      middleware.webpackDevMiddleware = webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath || '/'
      })
      middleware.webpackHotMiddleware = webpackHotMiddleware(compiler)

      middleware.order.unshift('webpackDevMiddleware', 'webpackHotMiddleware')
    }
  }
}
