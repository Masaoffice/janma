/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // GitHub Pages の project page (https://username.github.io/repo-name/) で公開する場合、
  // 下記の basePath / assetPrefix を有効化してください（"janma" の部分はリポジトリ名）。
  // basePath: '/janma',
  // assetPrefix: '/janma/',
  trailingSlash: true,
};

module.exports = nextConfig;
