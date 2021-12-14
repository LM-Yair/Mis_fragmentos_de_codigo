const htmlWebpackPlugin = require( 'html-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' );
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/js/",
  output: {
    filename: "bundle.[contenthash].js",
    publicPath: "/",
  },
  devServer: {
    static: "./dist/index.html",
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/i,
        use: ["babel-loader"],
      },
      {
        test: /\.html$/i,
        use: [{ loader: "html-loader", options: { minimize: false } }],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "./",
            },
          },
	  {
	    loader: 'css-loader',
	    options: {
	      importLoaders: 1,
	    },
	  },
	  'postcss-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp|woff|woff2|ttf|eot)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[name].[ext]",
            },
          },
          "image-webpack-loader",
        ],
      },
      {
        test: /\.woff$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin({
      exclude: /node_modules/i,
    })],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
