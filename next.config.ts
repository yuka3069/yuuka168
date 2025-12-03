// Put `outputFileTracingIncludes` at the top level — Next 13+ expects it there.
// Use `as any` on the config to avoid TypeScript complaining about this optional key.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nextConfig: any = {
  webpack(config: { module: { rules: { test: RegExp; use: string[] }[] } }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  outputFileTracingIncludes: {
    "/*": ["./contents/**/*", "./zh-contents/**/*"],
  },
};

export default nextConfig;
