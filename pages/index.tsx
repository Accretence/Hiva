import { useEffect, useState } from 'react'
import Image from 'next/future/image'
import Link from 'next/link'

import BlogPostCard from 'components/blog/BlogPostCard'
import VideoCard from 'components/VideoCard'

import prisma from 'lib/prisma'
import { useAuth } from 'state/Auth'
import { NextSeo } from 'next-seo'

export default function Index({ auth, unserialized }) {
    const [posts, setPosts] = useState(JSON.parse(unserialized) || null)
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
                Featured
            </h3>
            <div className="flex flex-col gap-6 md:flex-row">
                {posts &&
                    posts.map((post: any) => (
                        <BlogPostCard
                            key={post.id}
                            title={post.title}
                            id={post.id}
                        />
                    ))}
            </div>
            <Link href="/blog">
                <a className="mt-8 flex h-6 rounded-lg leading-7 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                    Read all posts...
                </a>
            </Link>

            <h3 className="mb-4 mt-16 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
                Learn React & Next.js
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
                Build and deploy a modern SaaS application using the most
                popular open-source software. This course is 12 hours long and
                is completely live streamed.
            </p>
            <VideoCard
                index="01"
                href="https://www.youtube.com/watch?v=MxR5I5_hOKk&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=2"
                length="1:02:45"
                title="Introduction to React 2025"
            />
            <VideoCard
                index="02"
                href="https://www.youtube.com/watch?v=AGl52moyISU&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=3"
                length="54:22"
                title="Firestore, Chakra UI, Absolute Imports"
            />
            <VideoCard
                index="03"
                href="https://www.youtube.com/watch?v=3g6-v3_BNbM&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=4"
                length="1:08:30"
                title="Designing & Building the Dashboard"
            />
            <VideoCard
                index="04"
                href="https://www.youtube.com/watch?v=u8iv_yhSRI8&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=5"
                length="1:13:45"
                title="Firebase Admin with Next.js + SWR"
            />
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/playlist?list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1"
                className="mt-8 flex h-6 rounded-lg leading-7 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
                Watch all videos ///
            </a>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const { AJWT } = ctx.req.cookies

    return {
        props: {
            auth: AJWT ? true : false,
            unserialized:
                JSON.stringify(await prisma.blogPost.findMany()) || null,
        },
    }
}
