/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  webpack(config, options) {
    if (!options.isServer) {
      config.output.publicPath = `${process.env.NEXT_PUBLIC_SELF_URL}/_next/`;
      config.output.uniqueName = "mfe_dashboard";
      config.output.chunkLoadingGlobal = "webpackChunk_mfe_transactions";
      config.optimization.runtimeChunk = false;
      const { ModuleFederationPlugin } = options.webpack.container;
      config.plugins.push(
        new ModuleFederationPlugin({
          name: "mfe_transactions",
          filename: "static/chunks/remoteEntry.js",
          exposes: {
            "./Transactions": "./src/components/Transactions/index",
          },
          library: { type: "var", name: "mfe_transactions" },
        })
      );
    }
    return config;
  },
};

export default nextConfig;