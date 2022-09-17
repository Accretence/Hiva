import bcrypt from 'bcryptjs'

export const clients = [{ title: 'First' }, { title: 'Second' }]

export const users = [
    {
        name: 'Admin User',
        email: 'admin@test.com',
        password: bcrypt.hashSync('12345678', 10),
        referralCode: 'ABCDE-FGHIJ-KLMNO',
        isAdmin: true,
        isEmailVerified: true,
    },
    {
        name: 'John Doe',
        email: 'test@test.com',
        password: bcrypt.hashSync('12345678', 10),
        referralCode: 'PQRST-UVWXY-ZABCD',
        isEmailVerified: true,
    },
    {
        name: 'Jane Doe',
        email: 'test2@test.com',
        password: bcrypt.hashSync('12345678', 10),
        referralCode: 'EFGHI-JKLMN-OPQRS',
        isEmailVerified: true,
    },
]

export const products = [
    {
        title: 'Elden Ring Definitive Edition',
        description:
            'THE NEW FANTASY ACTION-adventure RPG. Rise, Tarnished, and be guided by grace to publisherish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
        categories: [{ title: 'games' }],
        images: [
            {
                url: 'https://image.api.playstation.com/vulcan/img/rnd/202201/1918/0P25Aw0mnLS1AwPYEUb6kIYC.png',
            },
        ],
        listings: [
            {
                platform: 'steam',
                region: 'us',
                price: 1505500,
                stock: 7,
                discount: 0,
            },
        ],
    },
]

export const blogPosts = [
    {
        title: 'Use of AI in Architecture',
        description: 'In this article, young and...',
        image: 'https://parametric-architecture.com/wp-content/uploads/2022/08/Midjourney_and_Dall-E-2-10.jpg',
    },
    {
        title: 'Interior Architecture created by Midjourney and DALL·E 2',
        description: 'AI-powered software Midjourney...',
        image: 'https://cdn.80.lv/api/upload/content/ef/62ab0fc526d9a.jpeg',
    },
    {
        title: 'Sci-Fi Environmental Concept Art with Midjourney',
        description:
            'Examples AI Generated Images can be used to enhance concept design.',
        image: 'https://cdnb.artstation.com/p/assets/images/images/050/712/571/large/gleb-alexandrov-midjourney-aiart-gleb-alexandrov-10.jpg',
    },
]
