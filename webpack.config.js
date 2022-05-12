// webpack.config.js
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


module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
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
        include: [path.join(__dirname, './src'), path.join(__dirname, './node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.css$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'less-loader'
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
      // {
      //   test: /\.ts$/,
      //   use: [
      //     'ts-loader'
      //   ]
      // },
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
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].css'
    // }),
    new VueLoaderPlugin()
  ],
  devServer: {
    port: 8080,
    hot: true,
    open: true,
    // contentBase: './dist'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin()
    ]
  },
}