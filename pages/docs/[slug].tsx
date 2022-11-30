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
            {docObject && <Sidebar docObject={docObject} />}
        </>
    )
}

export async function getStaticProps({ params }) {
    const docs = await prisma.documentPage.findMany()
    const categories = new Set(docs.map((doc) => doc.category))

    let docObject = {}
    categories.forEach((category) => {
        docObject[category] = []

        docs.forEach((doc) => {
            if (doc.category == category) {
                docObject[category].push({
                    title: doc.title,
                    route: doc.slug,
                })
            }
        })
    })

    console.log(docObject)

    return { props: { docObject } }
}

export async function getStaticPaths() {
    const docs = await prisma.documentPage.findMany()
    const slugs = docs.map((doc) => doc.slug)
    const paths = slugs.map((slug) => ({ params: { slug } }))

    return { paths, fallback: false }
}
