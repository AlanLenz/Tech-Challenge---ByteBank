/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: process.env.NEXT_PUBLIC_SELF_URL,
  experimental: {
    externalDir: true,
  },
  webpack(config, options) {
    if (!options.isServer) {
      config.output.publicPath = `${process.env.NEXT_PUBLIC_SELF_URL}/_next/`;
      config.output.uniqueName = "mfe_dashboard";
      config.output.chunkLoadingGlobal = "webpackChunk_mfe_dashboard";
      config.optimization.runtimeChunk = false;
      const { ModuleFederationPlugin } = options.webpack.container;
      config.plugins.push(
        new ModuleFederationPlugin({
          name: "mfe_dashboard",
          filename: "static/chunks/remoteEntry.js",
          exposes: {
            "./mount": "./src/components/Dashboard/mount",
          },
          library: { type: "var", name: "mfe_dashboard" },
        })
      );
    }
    return config;
  },
};

export default nextConfig;