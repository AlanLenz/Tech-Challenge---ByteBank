/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  webpack(config, options) {
    if (!options.isServer) {
      config.output.uniqueName = "bytebank";
      config.output.chunkLoadingGlobal = "webpackChunk_bytebank";
    }
    return config;
  },
};

export default nextConfig;