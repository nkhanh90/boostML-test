const {
  override,
  disableChunk,
  removeModuleScopePlugin,
  addBabelPresets,
  addBabelPlugins,
  addWebpackModuleRule,
  addWebpackExternals,
} = require('customize-cra');

const node_loader = {
  test: /\.node$/,
  use: 'node-loader',
};

const xls = {
  './cptable': 'var cptable',
  '../xlsx': 'var _XLSX',
};

module.exports = override(
  ...addBabelPresets('@babel/preset-env', '@babel/preset-react'),
  addBabelPlugins('@babel/plugin-proposal-class-properties'),
  disableChunk(),
  removeModuleScopePlugin(),
  addWebpackModuleRule(node_loader),
  addWebpackExternals(xls),
);
