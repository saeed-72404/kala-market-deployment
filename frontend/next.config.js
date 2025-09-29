/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features
  experimental: {
    esmExternals: false,
    serverComponentsExternalPackages: ["@prisma/client"],
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },

  // Build configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  // API rewrites
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend:3000/api/v1/:path*',
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true,
      },
    ];
  },

  // Compression and optimization
  compress: true,
  poweredByHeader: false,

  // Output for Docker
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,

  // Environment variables
  env: {
    CUSTOM_KEY: "kala-market-v1",
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    if (process.env.ANALYZE === "true") {
      (async () => {
        const { BundleAnalyzerPlugin } = await import("webpack-bundle-analyzer");
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: "server",
            analyzerPort: isServer ? 8888 : 8889,
            openAnalyzer: true,
          })
        );
      })();
    }

    // جلوگیری از خطای bcrypt در سمت کلاینت
    if (!isServer) {
      config.externals.push({
        bcrypt: "commonjs bcrypt",
      });
    }

    // تنظیم splitChunks برای vendor
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    };

    return config;
  },
};

export default nextConfig;
