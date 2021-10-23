import path from 'path'
import webpack from 'webpack'
import devServer from 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import createStyledComponentsTransformer from 'typescript-plugin-styled-components'

const styledComponentsTransformer = createStyledComponentsTransformer()

const baseDev = () => {
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
          loader: require.resolve('ts-loader'),
          options: {
            getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
          },
          exclude: '/node_modules/'
        }
      ]
    },
    plugins: [
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
