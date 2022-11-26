import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {
    BlogPostCard,
    BlogPostCardSkeleton,
} from 'components/blog/BlogPostCard'
import VideoCard from 'components/VideoCard'

import prisma from 'lib/prisma'
import { useAuth } from 'state/Auth'
import { NextSeo } from 'next-seo'

export default function Index({ auth, uBlogPosts, uUsers, uProducts }) {
    const { isAuthenticated, setLocalAuthentication } = useAuth()
    const [blogPosts, setBlogPosts] = useState(
        (uBlogPosts && JSON.parse(uBlogPosts)) || null
    )
    const [users, setUsers] = useState((uUsers && JSON.parse(uUsers)) || null)
    const [products, setProducts] = useState(
        (uProducts && JSON.parse(uProducts)) || null
    )

    useEffect(() => {
        setLocalAuthentication(auth)
    }, [])

    return (
        <div className="flex flex-col border-gray-200 dark:border-gray-700">
            <h3 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
                Recent Blog Posts
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {blogPosts
                    ? blogPosts.map((post: any) => (
                          <BlogPostCard key={post.id} post={post} />
                      ))
                    : [...Array(3)].map(() => (
                          <BlogPostCardSkeleton key={Math.random()} />
                      ))}
            </div>
            <Link
                className="mt-8 flex h-6 rounded-lg leading-7 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                href="/blog"
            >
                See all posts...
            </Link>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    try {
        const { AJWT } = ctx.req.cookies

        return {
            props: {
                auth: AJWT ? true : false,
                uBlogPosts: JSON.stringify(
                    await prisma.blogPost.findMany({ take: 3 })
                ),
                uUsers: JSON.stringify(await prisma.user.findMany({ take: 3 })),
                uProducts: JSON.stringify(
                    await prisma.blogPost.findMany({ take: 3 })
                ),
            },
        }
    } catch (error) {
        return { props: {} }
    }
}
