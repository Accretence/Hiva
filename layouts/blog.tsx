import Image from 'next/future/image'
import { parseISO, format } from 'date-fns'
import { PropsWithChildren, Suspense } from 'react'

import Container from 'components/Container'
import ViewCounter from 'components/ViewCounter'
import { Post } from 'lib/types'

export default function BlogLayout({
    children,
    post,
}: PropsWithChildren<{ post: Post }>) {
    return (
        <Container
            title={`${post.title} – Lee Robinson`}
            description={post.excerpt}
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png"
            date={new Date(post.date).toISOString()}
            type="article"
        >
            <article className="mx-auto mb-16 flex w-full max-w-2xl flex-col items-start justify-center">
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
                    {post.title}
                </h1>
                <div className="mt-2 flex w-full flex-col items-start justify-between md:flex-row md:items-center">
                    <div className="flex items-center">
                        <Image
                            alt="Lee Robinson"
                            height={24}
                            width={24}
                            sizes="20vw"
                            src="/avatar.jpg"
                            className="rounded-full"
                        />
                        <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            {'Lee Robinson / '}
                            {format(parseISO(post.date), 'MMMM dd, yyyy')}
                        </p>
                    </div>
                    <p className="min-w-32 mt-2 text-sm text-gray-600 dark:text-gray-400 md:mt-0">
                        {post.readingTime}
                        {` • `}
                        <ViewCounter id={post.id} />
                    </p>
                </div>
                <Suspense fallback={null}>
                    <div className="mt-4 w-full max-w-none">{children}</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                        <a
                            href={`https://mobile.twitter.com/search?q=${encodeURIComponent(
                                `https://leerob.io/blog/${post.id}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {'Discuss on Twitter'}
                        </a>
                        {` • `}
                        <a
                            href="https://github.com/leerob/leerob.io/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {'Suggest Change'}
                        </a>
                    </div>
                </Suspense>
            </article>
        </Container>
    )
}
