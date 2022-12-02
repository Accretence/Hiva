/**
 * @type {import('next').NextConfig}
 */

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'parametric-architecture.com',
            },
            {
                protocol: 'https',
                hostname: '**.80.lv',
            },
            {
                protocol: 'https',
                hostname: '**.artstation.com',
            },
            {
                protocol: 'https',
                hostname: 'dummyjson.com',
            },
            {
                protocol: 'http',
                hostname: 'hd.wallpaperswide.com',
            },
            {
                protocol: 'https',
                hostname: 'flowbite.com',
            },
            {
                protocol: 'https',
                hostname: 'image.api.playstation.com',
            },
            {
                protocol: 'https',
                hostname: 'gameluster.com',
            },
        ],
    },
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'fa'],
        defaultLocale: 'en',
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
        ]
    },
    async redirects() {
        return [
            {
                source: '/product',
                destination: '/products',
                permanent: true,
            },
            {
                source: '/order',
                destination: '/',
                permanent: true,
            },
            {
                source: '/docs',
                destination: '/docs/welcome',
                permanent: true,
            },
        ]
    },
}
