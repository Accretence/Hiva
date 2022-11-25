import BlogLayout from 'layouts/blog'
import Tweet from 'components/blog/Tweet'

import { Post } from 'lib/types'
import prisma from 'lib/prisma'
import { NextSeo } from 'next-seo'

import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

const Test = () => {
    return <span className="text-red-300">Test</span>
}

const components = { Test }
export default function BlogPost({ source }) {
    return (
        <>
            <NextSeo title="Blog" description="Description" />
            {source && (
                <div className="rounded-lg bg-gray-800/50 p-6 text-white">
                    <MDXRemote lazy {...source} components={components} />
                </div>
            )}
        </>
    )
}

export async function getServerSideProps() {
    const source = 'Some **mdx** text, with a component <Test />'
    const mdxSource = await serialize(source)
    return { props: { source: mdxSource } }
}
