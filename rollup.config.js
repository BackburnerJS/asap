import babel from 'rollup-plugin-babel';

export default {
  entry: 'dist/es6/index.js',
  dest: 'dist/index.js',
  format: 'amd',
  moduleName: 'ASAP',
  moduleId: 'asap.js',
  sourceMap: 'inline',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      sourceMaps: 'inline'
    })
  ]
};