const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const toDashString = require('./utils/convert').toDashString;

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {},
  output: {
    filename: 'scripts/[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        include: path.resolve(__dirname, 'src/fonts'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[contenthash].[ext]'
            }
          },
        ]
      },
      {
        test: /\.pug$/i,
        use: [
          {
            loader: 'pug-loader',
            options: {
              // Base dir for absolute imports
              root: path.resolve(__dirname, 'src/blocks')
            }
          }
        ]
      },
      {
        test: /\.(c|sc)ss$/i,
        use: [
          'css-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              removeCR: true // to prevent 'no orphan CR found'
            }
          }, // needed for correct path resolving
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true, // must be set for resolve-url-loader working
              sassOptions: {
                // Where looking for files to import with absolute paths
                includePaths: [
                  path.resolve(__dirname, 'src/blocks'),
                  path.resolve(__dirname, 'src')
                ]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: {
      blocksPath: path.resolve(__dirname, 'src/blocks'), // for correct paths to required assets in pug mixins
      images: path.resolve(__dirname, 'src/images'),
      utils: path.resolve(__dirname, 'utils')
    }
  }
};

const pathToEntries = path.join(module.exports.context, 'pages');
const types = ['.js', '.scss'];

[
  'colorsAndType',
  'formElements',
  'cards',
  'headersAndFooters',
  'landingPage',
  'searchRoom',
  'roomDetails',
  'registration',
  'signIn'
].forEach(entryName => {
  const entryFiles = [];
  const dashedName = toDashString(entryName);
  const pathToEntry = path.join(pathToEntries, dashedName);
  types.forEach(type => {
    const entryFile = path.join(pathToEntry, `${dashedName}${type}`);
    if (fs.existsSync(entryFile)) {
      entryFiles.push(entryFile);
    }
  });
  if (entryFiles.length) {
    module.exports.entry[entryName] = entryFiles;
  }
  module.exports.plugins.push(
    new HtmlWebpackPlugin({
      template: path.join(pathToEntry, `${dashedName}.pug`),
      filename: `${dashedName}.html`,
      chunks: [entryName]
    }),
  );
});