import bcrypt from 'bcryptjs'

export const users = [
    {
        name: 'Admin User',
        email: 'accretence@gmail.com',
        password: bcrypt.hashSync('12345678', 10),
        referralCode: 'ABCDE-FGHIJ-KLMNO',
        isAdmin: true,
        isEmailVerified: true,
    },
    {
        name: 'John Doe',
        email: 'unbuildables@gmail.com',
        password: bcrypt.hashSync('12345678', 10),
        referralCode: 'PQRST-UVWXY-ZABCD',
        isAdmin: true,
        isEmailVerified: true,
    },
    {
        name: 'Jane Doe',
        email: 'iqoror@gmail.com',
        password: bcrypt.hashSync('12345678', 10),
        referralCode: 'EFGHI-JKLMN-OPQRS',
        isAdmin: true,
        isEmailVerified: true,
    },
]

export const blogPosts = [
    {
        title: 'Use of AI in Architecture',
        description: 'In this article, young and...',
        image: 'https://parametric-architecture.com/wp-content/uploads/2022/08/Midjourney_and_Dall-E-2-10.jpg',
        categories: ['technology', 'architecture'],
    },
    {
        title: 'Interior Architecture created by Midjourney and DALL·E 2',
        description: 'AI-powered software Midjourney...',
        image: 'https://cdn.80.lv/api/upload/content/ef/62ab0fc526d9a.jpeg',
        categories: ['technology', 'design', 'academic'],
    },
    {
        title: 'Sci-Fi Environmental Concept Art with Midjourney',
        description:
            'Examples AI Generated Images can be used to enhance concept design.',
        image: 'https://cdnb.artstation.com/p/assets/images/images/050/712/571/large/gleb-alexandrov-midjourney-aiart-gleb-alexandrov-10.jpg',
        categories: ['technology', 'design', 'game-design'],
    },
]

export const discounts = [
    {
        code: 'OFF',
        maxUses: 10,
        burntUses: 9,
        maxAmount: 100000,
        percentage: 15,
    },
    {
        code: 'CHRISTMAS',
        maxUses: 10,
        burntUses: 7,
        maxAmount: 200000,
        percentage: 10,
    },
]

export const products = [
    {
        id: 1,
        title: 'Elden Ring Definitive Edition',
        description:
            'THE NEW FANTASY ACTION-adventure RPG. Rise, Tarnished, and be guided by grace to publisherish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Bandai Namco',
        category: 'games',
        images: [
            'https://image.api.playstation.com/vulcan/img/rnd/202201/1918/0P25Aw0mnLS1AwPYEUb6kIYC.png',
        ],
    },
    {
        id: 2,
        title: 'Stray',
        description:
            'Lost, alone and separated from family, a stray cat must untangle an ancient mystery to escape a long-forgotten cybercity and find their way home.',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Bandai Namco',
        category: 'games',
        images: [
            'https://gameluster.com/wp-content/uploads/2022/07/Stray-Cover-Image-scaled.jpg',
        ],
    },
    {
        id: 3,
        title: 'Elden Ring Definitive Edition',
        description:
            'THE NEW FANTASY ACTION-adventure RPG. Rise, Tarnished, and be guided by grace to publisherish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Bandai Namco',
        category: 'games',
        images: [
            'https://image.api.playstation.com/vulcan/img/rnd/202201/1918/0P25Aw0mnLS1AwPYEUb6kIYC.png',
        ],
    },
    {
        id: 4,
        title: 'Stray',
        description:
            'Lost, alone and separated from family, a stray cat must untangle an ancient mystery to escape a long-forgotten cybercity and find their way home.',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Bandai Namco',
        category: 'games',
        images: [
            'https://gameluster.com/wp-content/uploads/2022/07/Stray-Cover-Image-scaled.jpg',
        ],
    },
    {
        id: 5,
        title: 'Elden Ring Definitive Edition',
        description:
            'THE NEW FANTASY ACTION-adventure RPG. Rise, Tarnished, and be guided by grace to publisherish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Bandai Namco',
        category: 'games',
        images: [
            'https://image.api.playstation.com/vulcan/img/rnd/202201/1918/0P25Aw0mnLS1AwPYEUb6kIYC.png',
        ],
    },
    {
        id: 6,
        title: 'Stray',
        description:
            'Lost, alone and separated from family, a stray cat must untangle an ancient mystery to escape a long-forgotten cybercity and find their way home.',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Bandai Namco',
        category: 'games',
        images: [
            'https://gameluster.com/wp-content/uploads/2022/07/Stray-Cover-Image-scaled.jpg',
        ],
    },
    {
        id: 7,
        title: 'Elden Ring Definitive Edition',
        description:
            'THE NEW FANTASY ACTION-adventure RPG. Rise, Tarnished, and be guided by grace to publisherish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Bandai Namco',
        category: 'games',
        images: [
            'https://image.api.playstation.com/vulcan/img/rnd/202201/1918/0P25Aw0mnLS1AwPYEUb6kIYC.png',
        ],
    },
    {
        id: 8,
        title: 'Stray',
        description:
            'Lost, alone and separated from family, a stray cat must untangle an ancient mystery to escape a long-forgotten cybercity and find their way home.',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Bandai Namco',
        category: 'games',
        images: [
            'https://gameluster.com/wp-content/uploads/2022/07/Stray-Cover-Image-scaled.jpg',
        ],
    },
]

export const docs = [
    {
        title: 'Welcome',
        index: 0,
        category: 'Getting Started',
        categoryIndex: 0,
        slug: 'welcome',
        content: 'Some **mdx** text, with a component <Test />',
    },
    {
        title: 'How to create an account?',
        index: 1,
        category: 'Getting Started',
        categoryIndex: 0,
        slug: 'how-to-create-an-account',
        content: 'Some **mdx** text, with a component <Test />',
    },
    {
        title: 'What is a wallet?',
        index: 2,
        category: 'Getting Started',
        categoryIndex: 0,
        slug: 'what-is-a-wallet',
        content: 'Some **mdx** text, with a component <Test />',
    },
    {
        title: 'What is $COIN?',
        index: 0,
        category: '$COIN',
        categoryIndex: 1,
        slug: 'what-is-coin',
        content: 'Some **mdx** text, with a component <Test />',
    },
    {
        title: 'What is $COIN used for?',
        index: 1,
        category: '$COIN',
        categoryIndex: 1,
        slug: 'what-is-coin-used-for',
        content: 'Some **mdx** text, with a component <Test />',
    },
    {
        title: 'Buying and selling $COIN?',
        index: 2,
        category: '$COIN',
        categoryIndex: 1,
        slug: 'buying-and-selling-coin',
        content: 'Some **mdx** text, with a component <Test />',
    },
]
