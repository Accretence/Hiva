import { memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import i18n from 'i18n.config'
import config from 'main.config'
import Image from 'next/image'
import prisma from 'lib/prisma'

export default function Product({ unserialized }) {
    const router = useRouter()

    const { locale = config['defaultLocale'] } = useRouter()

    const [product, setProduct] = useState(JSON.parse(unserialized))
    const [listingID, setListingID] = useState(null)
    const [loading, setLoading] = useState(false)

    return (
        <>
            <NextSeo
                title={product.title || 'Product'}
                description={product.description || 'Product Page'}
                openGraph={{ images: product.images[0]['url'] }}
            />
        </>
    )
}

const Breadcrumbs = ({ product }) => {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <a
                        href="#"
                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        <svg
                            className="mr-2 h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                        </svg>
                        Home
                    </a>
                </li>
                <li>
                    <div className="flex items-center">
                        <svg
                            className="h-6 w-6 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <a
                            href="#"
                            className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:ml-2"
                        >
                            Projects
                        </a>
                    </div>
                </li>
                <li aria-current="page">
                    <div className="flex items-center">
                        <svg
                            className="h-6 w-6 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2">
                            Flowbite
                        </span>
                    </div>
                </li>
            </ol>
        </nav>
    )
}

const ProductImages = ({ product }) => {
    return (
        <div id="default-carousel" className="relative" data-carousel="static">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                >
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-white dark:text-gray-800 sm:text-3xl">
                        First Slide
                    </span>
                    <Image
                        src="/docs/images/carousel/carousel-1.svg"
                        className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
                        alt="..."
                    />
                </div>
                <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                >
                    <Image
                        src="/docs/images/carousel/carousel-2.svg"
                        className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
                        alt="..."
                    />
                </div>
                <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                >
                    <Image
                        src="/docs/images/carousel/carousel-3.svg"
                        className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
                        alt="..."
                    />
                </div>
            </div>
            <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3">
                <button
                    type="button"
                    className="h-3 w-3 rounded-full"
                    aria-current="false"
                    aria-label="Slide 1"
                    data-carousel-slide-to="0"
                ></button>
                <button
                    type="button"
                    className="h-3 w-3 rounded-full"
                    aria-current="false"
                    aria-label="Slide 2"
                    data-carousel-slide-to="1"
                ></button>
                <button
                    type="button"
                    className="h-3 w-3 rounded-full"
                    aria-current="false"
                    aria-label="Slide 3"
                    data-carousel-slide-to="2"
                ></button>
            </div>
            <button
                type="button"
                className="group absolute top-0 left-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
                data-carousel-prev
            >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10">
                    <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 19l-7-7 7-7"
                        ></path>
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button
                type="button"
                className="group absolute top-0 right-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
                data-carousel-next
            >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10">
                    <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                        ></path>
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    )
}

const ProductMain = ({
    product,
    listingID,
    setListingID,
    loading,
    setLoading,
}) => {
    const router = useRouter()

    const { locale = config['defaultLocale'] } = useRouter()

    async function insertToCart() {}

    return <div></div>
}

const ProductDescription = ({ product }) => {
    return <div></div>
}

export async function getServerSideProps(context) {
    const { id } = context.query

    try {
        return {
            props: {
                unserialized:
                    JSON.stringify(
                        await prisma.blogPost.findUnique({ where: { id } })
                    ) || null,
            },
        }
    } catch (error) {
        return { props: {} }
    }
}
