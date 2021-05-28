const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = function(source, build) {
    return {
        module: {
            rules: [{
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                },
            }, ],
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                  {
                    from: source+'/img/',
                    to: build+'/images/',
                    toType: 'dir',
                  },
                //   {
                //     from: 'src/files/',
                //     to: 'files/',
                //     toType: 'dir',
                //   },
                ]
              }),
          ],
    };
}