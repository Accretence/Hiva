import Sidebar from 'components/docs/sidebar'
import prisma from 'lib/prisma'
import { NextSeo } from 'next-seo'

export default function Doc({ sideData, doc }) {
    return (
        <>
            <NextSeo
                title="Simple Usage Example"
                description="A short description goes here."
            />
            {sideData && <Sidebar sideData={sideData} />}
        </>
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

    const doc = await prisma.documentPage.findUnique({ where: { slug } })

    return { props: { sideData, doc: JSON.stringify(doc) } }
}

export async function getStaticPaths() {
    const docs = await prisma.documentPage.findMany()
    const slugs = docs.map((doc) => doc.slug)
    const paths = slugs.map((slug) => ({ params: { slug } }))

    return { paths, fallback: false }
}
