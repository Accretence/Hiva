import { NextSeo } from 'next-seo'

import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import MDXComponents from 'components/mdx/MDXComponents'

export default function BlogPost({ source }) {
    return (
        <>
            <NextSeo title="Blog" description="Description" />
            {source && (
                <div className="rounded-lg bg-gray-800/50 p-6 text-white">
                    <MDXRemote lazy {...source} components={MDXComponents} />
                </div>
            )}
        </>
    )
}

export async function getServerSideProps() {
    const source =
        '<Header title="Welcome!"/> Some **mdx** text, with a component'
    const mdxSource = await serialize(source)
    return { props: { source: mdxSource } }
}
