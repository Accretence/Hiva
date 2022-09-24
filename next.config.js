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
        ],
    },
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'fa'],
        defaultLocale: 'en',
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
        ]
    },
}
