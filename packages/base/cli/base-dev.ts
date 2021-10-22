import path from 'path'
import webpack from 'webpack'
import devServer from 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const baseDev = () => {
  console.log('run from dev')

  const compiler = webpack({
    // webpack options
    mode: 'development',
    entry: [
      require.resolve('webpack-dev-server/client'),
      path.join(process.cwd(), 'src', 'index.tsx')
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(process.cwd(), 'dist')
    },
    resolve: {
      extensions: [ '.ts', '.tsx', '.js' ]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: require.resolve('ts-loader'),
          exclude: '/node_modules/'
        }
      ]
    },
    plugins: [
      // new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(process.cwd(), 'public', 'index.html')
      })
    ]
  })

  const devServerOptions = {
    hot: true,
    port: 9000,
    open: true
  }
  const server = new devServer(devServerOptions, compiler)

  const runServer = async () => {
    console.log("Starting server...")
    await server.start()
  };

  runServer()
}

export { baseDev }
