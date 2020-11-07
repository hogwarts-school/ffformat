import typescript from 'rollup-plugin-typescript2';
import sourceMaps from 'rollup-plugin-sourcemaps';
import tsc from 'typescript';
import alias from 'rollup-plugin-alias';

const isProd = process.env.NODE_ENV === 'prod';

const devPlugins = [
  typescript({
    exclude: 'node_modules/**',
    typescript: tsc,
    tsconfig: './tsconfig.rollup.json'
  }),
  sourceMaps()
];

const prodPlugins = [
  typescript({
    exclude: 'node_modules/**',
    typescript: tsc,
    tsconfig: './tsconfig.rollup.prod.json'
  })
];

const isUseSourceMap = true;

export default {
  input: './src/index.ts',
  plugins: [
    ...(isProd ? prodPlugins : devPlugins),
    alias({
      resolve: ['.ts', '.js'],
      entries: {
        '@src': './src',
        '@constant': './src/constant',
        '@dataFormat': './src/constant',
        '@creator': './src/constant',
        '@utils': './src/constant'
      }
    })
  ],
  output: [
    {
      format: 'cjs',
      file: 'lib/index.cjs.js',
      sourcemap: isUseSourceMap
    },
    {
      format: 'es',
      file: 'lib/index.esm.js',
      sourcemap: isUseSourceMap
    },
    {
      name: 'ffformat',
      format: 'umd',
      file: 'lib/index.umd.js',
      sourcemap: isUseSourceMap
    }
  ]
};
