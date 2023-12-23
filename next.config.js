/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const withSvgr = require("next-plugin-svgr");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withPlugins([[withBundleAnalyzer], [withSvgr]], {
  images: {
    unoptimized: true,
  },
});
