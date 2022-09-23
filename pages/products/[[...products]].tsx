import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import i18n from 'i18n.config'
import config from 'main.config'
import fetcher from 'lib/fetcher'
import { ProductsList } from 'lib/types'

export default function Products({ currentPage, category, tags, sort }) {
    const { data } = useSWR<ProductsList>(`/api/products/list`, fetcher)

    const products = data?.products
    const totalPages = data?.totalPages
    console.log({ data, products, totalPages })

    const { locale = config['defaultLocale'] } = useRouter()
    const { title, description } = i18n['pages']['products']

    const [keyword, setKeyword] = useState(null)
    const [loading, setLoading] = useState(false)

    return (
        <>
            <NextSeo title="Blog" description="Blogs Directory" />
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products &&
                    products.map((product) => (
                        <div className="w-full max-w-sm rounded-lg bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
                            <a href="#">
                                <img
                                    className="rounded-t-lg p-8"
                                    src={product.images[0]}
                                    alt="product image"
                                />
                            </a>
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
                                    <a
                                        href="#"
                                        className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Add to cart
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    )
}

const ProductGrid = ({ products }) => {
    return <div></div>
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
