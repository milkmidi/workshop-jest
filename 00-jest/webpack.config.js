const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require('webpack');

const DEV_MODE = process.env.NODE_ENV === 'development';
const CONTENT_HASH = DEV_MODE ? '' : '-[contenthash]';

const creatSCSSRules = (isModule) => {
  const modulesConfig = {
    modules: {
      localIdentName: '[path][name]__[local]--[hash:base64:5]',
    },
  };
  const moduleOptions = isModule ? modulesConfig : {};
  return [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {},
    },
    {
      loader: 'css-loader',
      // https://github.com/webpack-contrib/style-loader#options
      options: {
        sourceMap: true,
        ...moduleOptions,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
        implementation: require('sass'),
        additionalData: `
          $DEV_MODE: ${DEV_MODE};
          @import '~css/_mixin.scss';
        `,
      },
    },
  ];
};

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  context: path.resolve('src'),
  mode: process.env.NODE_ENV,
  entry: {
    app: ['./index.tsx'],
  },
  devtool: DEV_MODE ? 'inline-source-map' : false,
  output: {
    filename: `js/[name]${CONTENT_HASH}.js`,
    chunkFilename: `js/[name]-chunk${CONTENT_HASH}.js`,
    path: path.resolve('dist'),
    publicPath: '/',
    assetModuleFilename: `assets/[name]${CONTENT_HASH}[ext][query]`,
  },
  cache: {
    type: 'filesystem',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    modules: [path.resolve('src'), path.resolve('node_modules')],
    alias: {
      '@': path.resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {},
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        include: path.resolve('src'),
        oneOf: [
          {
            test: /\.module.scss$/,
            use: creatSCSSRules(true),
          },
          {
            test: /\.scss$/,
            use: creatSCSSRules(false),
          },
        ],
      },
      {
        test: /\.pug$/,
        use: [
          { loader: 'html-loader' },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: DEV_MODE,
              data: {
                DEV_MODE,
              },
            },
          },
        ],
        include: path.resolve('src/html'),
      },
      {
        // https://webpack.js.org/guides/asset-modules/
        // https://webpack.docschina.org/guides/asset-modules/
        test: /\.(png|jpg|gif|svg|ico)$/,
        oneOf: [
          {
            type: 'asset/inline',
            resourceQuery: /inline/,
            parser: {
              dataUrlCondition: {
                maxSize: 99999999,
              },
            },
          },
          {
            type: 'asset/resource',
            parser: {
              dataUrlCondition: {
                maxSize: 1024 * 2, // 2kb
              },
            },
          },
        ],
        include: path.resolve('src/img'),
      },
    ],
  },
  /*
    ########  ##       ##     ##  ######   #### ##    ##  ######
    ##     ## ##       ##     ## ##    ##   ##  ###   ## ##    ##
    ##     ## ##       ##     ## ##         ##  ####  ## ##
    ########  ##       ##     ## ##   ####  ##  ## ## ##  ######
    ##        ##       ##     ## ##    ##   ##  ##  ####       ##
    ##        ##       ##     ## ##    ##   ##  ##   ### ##    ##
    ##        ########  #######   ######   #### ##    ##  ######
  */
  plugins: [
    new HtmlWebpackPlugin({
      template: './html/index.pug',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: `css/[name]${CONTENT_HASH}.css`,
    }),
    new FriendlyErrorsWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve('tsconfig.json'),
      },
    }),
    new webpack.DefinePlugin({}),
    new ProgressBarPlugin(),
    ...(DEV_MODE ? [] : []),
  ],
  /**
   * @type {import('webpack-dev-server').Configuration}
   */
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    // 可以用 ip 連線，預設是 localhost
    host: '0.0.0.0',
    onBeforeSetupMiddleware: (devServer) => {
      const { app } = devServer;
      const bodyParser = require('body-parser');
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));

      app.use('/api/todo', (req, res) => {
        const initialList = [
          { id: 'id1', text: '學會 React', done: true },
          { id: 'id2', text: '學會 Webpack', done: false },
          { id: 'id3', text: '學會 Javascript', done: false },
        ];

        res.json(initialList);
      });
    },
  },
  // https://webpack.js.org/configuration/stats/
  stats: DEV_MODE ? 'errors-only' : 'minimal',
  optimization: {
    runtimeChunk: {
      name: 'single',
    },
    minimize: !DEV_MODE,
    minimizer: DEV_MODE ? [] : [new CssMinimizerPlugin(), new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          enforce: true,
        },
      },
    },
  },
};
