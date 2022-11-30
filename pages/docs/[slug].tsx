import Sidebar from 'components/docs/sidebar'
import prisma from 'lib/prisma'
import { NextSeo } from 'next-seo'

export default function Doc({ docObject }) {
    return (
        <>
            <NextSeo
                title="Simple Usage Example"
                description="A short description goes here."
            />
            <Sidebar docObject={docObject} />
        </>
    )
}

export async function getStaticProps({ params }) {
    return { props: {} }
}

export async function getStaticPaths() {
    const docs = await prisma.documentPage.findMany()
    console.log(docs)
    const slugs = docs.map((doc) => doc.slug)
    console.log(slugs)
    const paths = slugs.map((slug) => ({ params: { slug } }))
    console.log(paths)

    return { paths, fallback: false }
}
