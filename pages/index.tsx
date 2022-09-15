import { useEffect, useState } from 'react'
import Image from 'next/future/image'
import Link from 'next/link'

import BlogPostCard from '../components/BlogPostCard'
import VideoCard from '../components/VideoCard'

import prisma from 'lib/prisma'
import { useAuth } from 'state/Auth'

export default function Home({ auth, initialPosts }) {
    const [posts, setPosts] = useState(initialPosts)
    const { isAuthenticated, setLocalAuthentication } = useAuth()

    useEffect(() => {
        setLocalAuthentication(auth)
    }, [])

    return (
        <div className="flex flex-col border-gray-200 dark:border-gray-700 pb-16">
            <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
                Featured
            </h3>
            <div className="flex gap-6 flex-col md:flex-row">
                {posts &&
                    posts.map((post: any) => (
                        <BlogPostCard
                            key={post.slug}
                            title={post.title}
                            slug={post.slug}
                        />
                    ))}
            </div>
            <Link href="/blog">
                <a className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6">
                    Read all posts...
                </a>
            </Link>

            <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-16 text-black dark:text-white">
                Learn React & Next.js
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
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
                className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6"
            >
                Watch all videos ///
            </a>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const { AJWT } = ctx.req.cookies
    const posts = await prisma.blogPost.findMany()

    return {
        props: { auth: AJWT ? true : false, initialPosts: posts },
    }
}
