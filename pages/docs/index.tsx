import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import Sidebar from 'components/docs/sidebar'
import prisma from 'lib/prisma'

export default function User({ doc }) {
    const router = useRouter()

    return (
        <>
            <NextSeo
                title="Simple Usage Example"
                description="A short description goes here."
            />
            <div className="grid grid-cols-7 gap-4">
                {doc && <Sidebar docObject={JSON.parse(doc)} />}
                <div className="col-span-6 h-full w-full rounded-md bg-gray-900/90 p-4 dark:text-gray-200 md:col-span-5">
                    yo
                </div>
            </div>
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

function getActiveButtonStyles() {
    return 'group flex items-center rounded-md bg-purple-700 py-3 px-6 text-gray-100 transition duration-300 hover:bg-black'
}

function getDisabledButtonStyles() {
    return 'no-scrollbar group flex items-center overflow-x-auto rounded-md border-2 border-solid border-gray-300/50 bg-transparent py-3 px-6 text-gray-300/50 dark:border-gray-500 dark:text-gray-500'
}
