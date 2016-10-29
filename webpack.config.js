var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './demo/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, './node_modules')],
    alias: {
      'von-app': path.resolve(__dirname, './src'),
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  vue: {
    loaders: {
      less: 'style!css!less',
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/dist/',
      filename: 'von-app.js'
    },
    externals: {
      "vue": "Vue",
      "vue-router": "VueRouter"
    },
    resolve: {
      extensions: ['', '.js', '.vue'],
      fallback: [path.join(__dirname, './node_modules')]
    },
    resolveLoader: {
      root: path.join(__dirname, 'node_modules'),
    },
    module: {
      loaders: [
        {
          test: /\.vue$/,
          loader: 'vue'
        },
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/
        },
        {
          test: /\.json$/,
          loader: 'json'
        },
        {
          test: /\.html$/,
          loader: 'vue-html'
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'url',
          query: {
            limit: 10000,
            name: '[name].[ext]?[hash]'
          }
        }
      ]
    },
    vue: {
      loaders: {
        less: 'style!css!less',
      }
    },
    devtool: '#source-map'
  }

  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
