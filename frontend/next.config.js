// next.config.js
const { parsed: localEnv } = require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  ...nextConfig,
  env: localEnv,
  output: 'standalone',
};

