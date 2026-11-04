const isStaticExport = process.env.NEXT_EXPORT === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
        trailingSlash: true,
      }
    : {}),
  ...(isStaticExport
    ? {
        output: 'export',
        distDir: 'out.nosync',
        images: {
          unoptimized: true,
        },
      }
    : {
        images: {
          formats: ['image/avif', 'image/webp'],
        },
        async redirects() {
          return [
            {
              source: '/index.html',
              destination: '/',
              permanent: true,
            },
            {
              source: '/about.html',
              destination: '/about',
              permanent: true,
            },
            {
              source: '/committee.html',
              destination: '/committee',
              permanent: true,
            },
            {
              source: '/programs.html',
              destination: '/programs',
              permanent: true,
            },
            {
              source: '/gallery.html',
              destination: '/gallery',
              permanent: true,
            },
            {
              source: '/membership.html',
              destination: '/membership',
              permanent: true,
            },
            {
              source: '/contact.html',
              destination: '/contact',
              permanent: true,
            },
          ];
        },
      }),
};

export default nextConfig;
