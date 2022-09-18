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
