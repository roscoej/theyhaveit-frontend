const withPlugins = require('next-compose-plugins');
const sass = require('@zeit/next-sass');
const css = require('@zeit/next-css');
const nextConfig = {};

module.exports = withPlugins([
    [sass],
    [css],
], nextConfig);
