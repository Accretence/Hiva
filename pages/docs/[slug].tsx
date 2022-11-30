import prisma from 'lib/prisma'
import { MDXRemote } from 'next-mdx-remote'
import { NextSeo } from 'next-seo'
import { serialize } from 'next-mdx-remote/serialize'
import MDXComponents from 'components/mdx/MDXComponents'
import { parseISO, format } from 'date-fns'
import Link from 'next/link'

export default function Doc({ sideData, doc, source }) {
    if (doc && sideData)
        return (
            <>
                <NextSeo
                    title="Simple Usage Example"
                    description="A short description goes here."
                />
                <div className="grid grid-cols-7 gap-4">
                    <Sidebar sideData={sideData} />
                    <Body doc={JSON.parse(doc)} source={source} />
                </div>
            </>
        )
}

function Body({ doc, source }) {
    return (
        <div className="col-span-6 rounded-lg bg-gray-100 p-6 dark:bg-gray-800/30 md:col-span-5">
            <h1 className="text-4xl font-medium text-gray-600 dark:text-gray-200">
                {doc['title']}
            </h1>
            <p className="mt-2 text-sm font-medium text-gray-400">
                Last Updated @{' '}
                {format(parseISO(doc.updatedAt), 'MMMM dd, yyyy')}
            </p>
            <hr className="border-1 mt-4 mb-10 w-full border-gray-200 dark:border-gray-800" />
            <MDXRemote lazy {...source} components={MDXComponents} />
        </div>
    )
}

function Sidebar({ sideData }) {
    return (
        <div className="no-scrollbar col-span-1 h-full w-full overflow-x-auto rounded-lg bg-gray-100 p-6 dark:bg-gray-800/30  md:col-span-2">
            {Object.keys(sideData).map((category) => (
                <div key={category} className="">
                    <p className="text-sm font-bold text-gray-400">
                        {category.toUpperCase()}
                    </p>
                    <ul className="my-3 ml-3 mb-6">
                        {sideData[category].map((page) => (
                            <li className="mb-2" key={page.title}>
                                <Link
                                    href={page.route}
                                    className="whitespace-nowrap rounded-md py-2 px-4 text-gray-800
                                    hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-900"
                                >
                                    {page.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export async function getStaticProps({ params }) {
    const { slug } = params
    const docs = await prisma.documentPage.findMany()
    const categories = new Set(docs.map((doc) => doc.category))

    let sideData = {}
    categories.forEach((category) => {
        sideData[category] = []

        docs.forEach((doc) => {
            if (doc.category == category) {
                sideData[category].push({
                    title: doc.title,
                    route: doc.slug,
                })
            }
        })
    })

    const doc = await prisma.documentPage.findUnique({
        where: { slug },
        include: { author: true },
    })

    const source = await serialize(doc.content)

    return { props: { sideData, doc: JSON.stringify(doc), source } }
}

export async function getStaticPaths() {
    const docs = await prisma.documentPage.findMany()
    const slugs = docs.map((doc) => doc.slug)
    const paths = slugs.map((slug) => ({ params: { slug } }))

    return { paths, fallback: false }
}
