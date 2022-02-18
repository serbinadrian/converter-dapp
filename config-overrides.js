const webpack = require('webpack');
module.exports = function override(config, env) {
  config.resolve.fallback = {
    url: require.resolve('url'),
    fs: require.resolve('fs'),
    assert: require.resolve('assert'),
    crypto: require.resolve('crypto-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer'),
    os: require.resolve('os-browserify/browser')
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser'
    })
  );
  return config;
};
