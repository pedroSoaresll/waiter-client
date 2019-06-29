const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const isDevelopment = process.env.NODE_ENV === 'development';
// const ImageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {
  publicPath: '/',
  lintOnSave: true,
  runtimeCompiler: true,
  integrity: false,
  productionSourceMap: isDevelopment,
  configureWebpack: {
    mode: isDevelopment ? 'development' : 'production',
    module: {
      rules: [
        {
          test: /\.(gql)$/,
          include: path.resolve(__dirname, 'src'),
          loader: 'graphql-tag/loader',
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          loader: 'babel-loader',
          exclude: file => (
            /node_modules/.test(file) && !/\.vue\.js/.test(file)
          ),
        },
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        // {
        //   test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        //   loader: 'url-loader',
        //   options: {
        //     limit: 10000,
        //     name: 'fonts/[name]-[hash:7].[ext]',
        //   },
        // },
        // {
        //   test: /^fontawesome(.*)?$/,
        //   loader: 'url-loader',
        //   options: {
        //     limit: 10000,
        //     name: 'fonts/[name]-[hash:7].[ext]',
        //   },
        // },
      ],
    },
    plugins: [
      new Dotenv({
        path: './.env',
        systemvars: true,
        silent: true,
      }),
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        disable: isDevelopment,
        optipng: {
          optimizationLevel: 7,
        },
        pngquant: {
          quality: '75-95',
          speed: 4,
          optimizationLevel: 9,
        },
        gifsicle: {
          optimizationLevel: 3,
        },
        jpegtran: {
          quality: 80,
          progressive: true,
        },
        svgo: {
          plugins: [
            {
              removeViewBox: false,
              removeEmptyAttrs: true,
            },
          ],
        },
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name]-[hash:7].css',
        chunkFilename: 'css/pkg-[id]-[hash:7].css',
      }),
      new CompressionPlugin(),
    ],
    output: {
      filename: 'js/[name]-[hash:7].js',
      chunkFilename: 'js/pkg-[id]-[hash:7].js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      port: 80,
      host: '0.0.0.0',
      compress: true,
      hot: true,
    },
    watchOptions: {
      ignored: /node_modules/,  
      poll: true
    }
  },
};
