
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.server = {
  ...config.server,
  enhanceMiddleware: (middleware, server) => {
    return (req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', 'https://9000-firebase-hostcity-1765543520147.cluster-bqwaigqtxbeautecnatk4o6ynk.cloudworkstations.dev');
      return middleware(req, res, next);
    };
  },
};

module.exports = config;
