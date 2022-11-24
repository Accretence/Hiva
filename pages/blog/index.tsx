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

export default function Index({ auth, unserialized }) {
    const [posts, setPosts] = useState(
        (unserialized && JSON.parse(unserialized)) || null
    )
    const { isAuthenticated, setLocalAuthentication } = useAuth()

    useEffect(() => {
        setLocalAuthentication(auth)
    }, [])

    return (
        <div className="flex flex-col border-gray-200 dark:border-gray-700">
            <NextSeo
                title="Simple Usage Example"
                description="A short description goes here."
            />
            <h3 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
                Blog Posts
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {posts
                    ? posts.map((post: any) => (
                          <BlogPostCard key={post.id} post={post} />
                      ))
                    : [...Array(3)].map(() => (
                          <BlogPostCardSkeleton key={Math.random()} />
                      ))}
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    try {
        const { AJWT } = ctx.req.cookies

        return {
            props: {
                auth: AJWT ? true : false,
                unserialized:
                    JSON.stringify(
                        await prisma.blogPost.findMany()
                    ) || null,
            },
        }
    } catch (error) {
        return { props: {} }
    }
}
