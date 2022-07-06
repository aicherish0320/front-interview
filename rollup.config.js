import path from 'path'
import ts from 'rollup-plugin-typescript2'
import serve from 'rollup-plugin-serve'

export default {
  input: './index.ts',
  output: {
    file: path.resolve(__dirname, 'dist/bundle.js'),
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    serve({
      // open: true,
      openPage: '/index.html',
      contentBase: '',
      port: '3300'
    })
  ]
}
