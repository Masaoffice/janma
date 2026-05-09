/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // GitHub Pages の project page (https://masaoffice.github.io/janma/) で公開するため有効化。
  basePath: '/janma',
  assetPrefix: '/janma/',
  trailingSlash: true,
};

module.exports = nextConfig;
