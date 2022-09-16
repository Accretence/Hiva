const url = process.env.NEXT_PUBLIC_URL

const title = {
    en: 'Hiva',
    fa: 'هیوا',
}

export default {
    title,
    meta: {
        description: {
            en: 'Small text as a description for the page.',
            fa: 'متن استفاده شده در صفحه مربوطه.',
        },
        image: 'https://i.imgur.com/NitQE9d.jpg',
        url,
        handle: '@example',
        keywords: 'nextjs, reactjs',
    },
    components: {
        nav: {
            mobile: [
                {
                    en: 'Home',
                    value: '/',
                },
                {
                    en: 'Contact',
                    value: '/contact',
                },
                {
                    en: 'About',
                    value: '/about',
                },
                {
                    en: 'Blog',
                    value: '/blog',
                },
                {
                    en: 'Docs',
                    value: '/docs',
                },
            ],
        },
    },
}
