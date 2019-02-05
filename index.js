const webpack = require('webpack')

module.exports = function webpackHook(sails) {
  if (process.env.NODE_ENV === 'production') {
    return {
      initialize() {
        const webpackConfig = sails.config.webpack
        const compiler = webpack(webpackConfig)
        console.log('Running webpack compiler')
        compiler.run((err, stats) => {
          if (err) {
            console.error(err)
            return
          }

          console.log(
            stats.toString({
              chunks: false,
              colors: true
            })
          )
        })
      }
    }
  }

  return {
    configure() {
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
