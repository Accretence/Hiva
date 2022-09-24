import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import i18n from 'i18n.config'
import config from 'main.config'
import fetcher from 'lib/fetcher'
import { ProductsList } from 'lib/types'
import Image from 'next/image'

export default function Products({ currentPage, category, tags, sort }) {
    const { data } = useSWR<ProductsList>(`/api/products/list`, fetcher)

    const products = data?.products
    const totalPages = data?.totalPages

    const { locale = config['defaultLocale'] } = useRouter()
    const { title, description } = i18n['pages']['products']

    const [keyword, setKeyword] = useState(null)
    const [loading, setLoading] = useState(false)

    return (
        <>
            <NextSeo title={title[locale]} description={description[locale]} />
            <ProductGrid products={products} />
        </>
    )
}

const ProductGrid = ({ products }) => {
    return (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products &&
                products.map((product) => (
                    <div
                        key={product.id}
                        className="w-full max-w-sm rounded-lg bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
                    >
                        <Link href={`/product/${product.id}`}>
                            <a>
                                <div className="relative h-64 w-96">
                                    <Image
                                        className="rounded-t-lg"
                                        src={product.images[0]['url']}
                                        alt="product image"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className="px-5 pb-5">
                                    <a href="#">
                                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                            {product.title}
                                        </h5>
                                    </a>
                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                            $599
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </div>
                ))}
        </div>
    )
}

const Paginated = ({ totalPages, currentPage }) => {
    const router = useRouter()

    return <div></div>
}

const Product = ({ product }) => {
    return <div></div>
}

const Filters = () => {
    return <div></div>
}

export async function getServerSideProps(ctx) {
    const { page = 1, category = '', tags = [], sort = '' } = ctx.query

    return {
        props: { currentPage: parseInt(page), category, tags, sort },
    }
}
