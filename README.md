<img src="./logo.png">

# :zap: sails-hook-webpack4 :zap:
Sails hook to provide webpack in your Sails application.

# Installation
If you already have a project with sails and grunt you need to disable grunt by
editing the `.sailsrc` file in this way
```
{
  "hooks": {
    "grunt": false
  }
}
```
Install this hook
```
yarn add sails-hook-webpack4
```
Write your configuration in `config/webpack.js`, e.g.:
``` javascript
const path = require(path)

module.exports.webpack = {
  entry: path.resolve(__dirname, '../src'),
  outputh: {
    path: path.resolve(__dirname, '../.tmp/public'),
    filename: 'bundle.js'
  }
}
```

Run `sails lift` and you're ready to go!

# :fire: Enable Hot Module Replacement :fire:
The hook already supports HMR, nevertheless you need to edit your webpack
configuration to make it work. You need to:
- Add `webpack-hot-middleware/client` to your `entry` array
- Add `webpack.HotModuleReplacementPlugin` to your `plugins`

Given the above configuration, if you apply the listed instructions, the file
should look like this:
``` javascript
const path = require(path)
const webpack = require('webpack')

module.exports.webpack = {
  entry: [
    //  New entry
    'webpack-hot-middleware/client',
    path.resolve(__dirname, '../src')
  ],
  outputh: {
    path: path.resolve(__dirname, '../.tmp/public'),
    filename: 'bundle.js'
  },
  //  New plugin
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
```

### Client side
If you don't have a library that does it for you (e.g. [react-hot-loader](https://github.com/gaearon/react-hot-loader)), you should handle the module replacement like this:
``` javascript
if (module.hot) {
  module.hot.accept('./my-module', () => {
    //  ....
  })
}
```

For more information checkout the [webpack documentation](https://webpack.js.org/guides/hot-module-replacement/)