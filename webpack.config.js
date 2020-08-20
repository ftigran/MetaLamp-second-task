const path = require('path')
const merge = require('webpack-merge')
const pug = require('./webpack/pug')
const scss = require('./webpack/scss')
const img = require('./webpack/img')
const fonts = require('./webpack/fonts')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')



const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
}
const common = merge([{
    entry: {
        index:                PATHS.source + '/index/index.js'
        },
    output: {
        path: PATHS.build,
        filename: 'js/[name].js'
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin({})
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'colors-and-types.html',
            chunks: ['colors-and-types', 'common'],
            template: PATHS.source + '/pages/colors-and-type/colors-and-type.pug'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),

    ]
},
pug(),
scss(),
img(),
fonts()
])
module.exports = function (env) {
    if (env === 'production') {
        return common
    }
    if (env === 'development') {
        return merge([
            common,
        devServer()
        ])
    }
}

/*
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/text-field.pug'
        })
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            }
        ]
    }
}


/*const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const { template } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const pug = require('./webpack/pug')
const scss = require('./webpack/scss')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const source: path.join(__dirname, 'src')

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadALL: true
            },
        }, 'css-loader']

        if (extra) {
            loaders.push(extra)
        }
        return loaders
}
console.log('is in dev', isDev)
const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (!isDev) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}
const plugins = () => {
    const base = [
        new HtmlWebpackPlugin({
            template: './modules/text-field/text-field.pug',
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new CleanWebpackPlugin(),
/*        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
new MiniCssExtractPlugin({
    filename: filename('css')
})
    ]

if (!isDev) {
    base.push(new BundleAnalyzerPlugin())
}

return base
}
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
        // analytics: './analytics.js'
    },

    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".wasm", ".ts", ".tsx", ".mjs", ".cjs", ".js", ".json"],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: [plugins(), pug(), scss()],
/*    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            }
        ]
    }

}*/