// webpack.config.js
const webpack = require('webpack');
const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {
  VueLoaderPlugin
} = require('vue-loader/dist/index');

const resolveSrc = (src) => path.resolve(__dirname, src)

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      '@': resolveSrc('src'),
      'pages': resolveSrc('src/pages'),
      'utils': resolveSrc('src/utils'),
      'assets': resolveSrc('src/assets'),
      'components': resolveSrc('src/components'),
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env']
          }
        },
        // include: [path.join(__dirname, './src'), path.join(__dirname, './node_modules/webpack-dev-server/client')],
        // exclude:'/node_modules/'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     publicPath: './'
          //   }
          // },
          // 'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          "sass-loader", // Compiles Sass to CSS
        ]
      },
      {
        test: /\.(jpg|png|jpeg|gif|bmp)$/,
        use: [{
            loader: 'url-loader',
            options: {
              limit: 1024,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]'
                }
              }
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|ogg|mp3|wav)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            fallback: {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]'
              }
            }
          }
        }
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      title: 'Vue3 + TS -> Web App',
      minify: {
        collapseWhitespace: true, // 去掉空格
        removeComments: true // 去掉注释
      }
    }),
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new VueLoaderPlugin(),
    // 使用vue3 时推荐开启 具体可查看 https://link.vuejs.org/feature-flags.
    new webpack.DefinePlugin({
      '__VUE_OPTIONS_API__': true, //（启用/禁用选项 API 支持，默认值true：）
      '__VUE_PROD_DEVTOOLS__': false //（在生产中启用/禁用 devtools 支持，默认值false：）
    })
  ],
  devServer: {
    port: 8080,
    hot: true,
    open: false, // 是否自动打开
    // contentBase: './dist'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin()
    ]
  },
}