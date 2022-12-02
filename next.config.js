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
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
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
