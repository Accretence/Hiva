import { NextSeo } from 'next-seo'

import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import MDXComponents from 'components/mdx/MDXComponents'
import prisma from 'lib/prisma'
import { parseISO, format } from 'date-fns'

export default function BlogPost({ blog, mdx }) {
    return (
        <>
            <NextSeo title="Blog" description="Description" />
            {mdx && <Body blog={JSON.parse(blog)} mdx={mdx} />}
        </>
    )
}

function Body({ blog, mdx }) {
    const { title, updatedAt } = blog

    return (
        <div className="rounded-lg bg-white p-6 text-justify text-gray-900 dark:bg-gray-800 dark:text-gray-200">
            <h1 className="mb-1 text-3xl font-medium">{title}</h1>
            <p className="mt-2 text-sm font-medium text-gray-400">
                Last Updated @ {format(parseISO(updatedAt), 'MMMM dd, yyyy')}
            </p>
            <hr className="border-1 mt-4 mb-10 w-full border-gray-200 dark:border-gray-600" />
            <MDXRemote lazy {...mdx} components={MDXComponents} />
        </div>
    )
}

export async function getServerSideProps({ params }) {
    const { slug } = params
    const blog = await prisma.blogPost.findUnique({ where: { slug } })
    const mdx = await serialize(blog.content)
    return { props: { blog: JSON.stringify(blog), mdx } }
}
