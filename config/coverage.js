/* eslint-env node */
module.exports = {
  reporters: ['lcov', 'html', 'text-summary'],
  useBabelInstrumenter: true,
  babelPlugins: [
    'babel-plugin-syntax-async-functions',
    //'babel-plugin-syntax-trailing-function-commas',
    'babel-plugin-syntax-exponentiation-operator',
    'babel-plugin-transform-async-to-generator',
    'babel-plugin-transform-es2015-arrow-functions',
    'babel-plugin-transform-es2015-block-scoped-functions',
    'babel-plugin-transform-es2015-block-scoping',
    'babel-plugin-transform-es2015-classes',
    'babel-plugin-transform-es2015-computed-properties',
    'babel-plugin-transform-es2015-destructuring',
    'babel-plugin-transform-es2015-duplicate-keys',
    'babel-plugin-transform-es2015-for-of',
    'babel-plugin-transform-es2015-function-name',
    'babel-plugin-transform-es2015-literals',
    'babel-plugin-transform-es2015-object-super',
    'babel-plugin-transform-es2015-parameters',
    'babel-plugin-transform-es2015-shorthand-properties',
    'babel-plugin-transform-es2015-spread',
    'babel-plugin-transform-es2015-sticky-regex',
    'babel-plugin-transform-es2015-template-literals',
    'babel-plugin-transform-es2015-typeof-symbol',
    'babel-plugin-transform-es2015-unicode-regex',
    'babel-plugin-transform-exponentiation-operator',
    'babel-plugin-transform-regenerator'
  ],
  parallel: true
};
