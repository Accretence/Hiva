import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import prisma from 'lib/prisma'
import fetcher from 'lib/fetcher'
import useSWR from 'swr'
import gradient from 'lib/gradient'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { getGoogleURL } from 'lib/google'
import { useAuth } from 'state/Auth'
import { decodeJWT } from 'lib/jwt'
import { omitUser } from 'lib/omit'
import { Spinner } from 'components/Icons'
import { NextSeo } from 'next-seo'

export default function User({ auth, omitted }) {
    const router = useRouter()
    const { isAuthenticated, setLocalAuthentication } = useAuth()
    const [userObject, setUserObject] = useState(JSON.parse(omitted) || null)
    console.log(userObject)

    useEffect(() => {
        setLocalAuthentication(auth)
    }, [])

    return (
        <>
            <NextSeo
                title="Simple Usage Example"
                description="A short description goes here."
            />
            <div className="rounded-lg bg-neutral-100 dark:bg-neutral-900">
                <UserInfo userObject={userObject} />
                <Orders userObject={userObject} />
                <Referrals userObject={userObject} />
                <Integrations userObject={userObject} />
            </div>
            <Logout />
        </>
    )
}

function UserInfo(userObject) {
    const [visibility, setVisibility] = useState(false)

    return (
        <div>
            <button
                type="button"
                className="flex w-full items-center justify-between rounded-t-lg border border-gray-200 p-5 text-left text-xl text-black hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                onClick={() => setVisibility(!visibility)}
            >
                <span className="flex flex-col">
                    <h1>User Info</h1>
                    <small className="text-gray-300">
                        Your personal information.
                    </small>
                </span>
                {visibility ? (
                    <ChevronUpIcon className="h-5 w-5" />
                ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                )}
            </button>
            <div className={!visibility && 'hidden'}>
                <div className="border border-gray-200 p-5 font-light dark:border-gray-700 ">
                    <p className="mb-2 text-justify font-normal text-neutral-700 dark:text-neutral-200"></p>
                </div>
            </div>
        </div>
    )
}

function Orders(userObject) {
    const [visibility, setVisibility] = useState(false)

    return (
        <div>
            <button
                type="button"
                className="flex w-full items-center justify-between border border-gray-200 p-5 text-left text-xl text-black transition-all ease-in-out hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                onClick={() => setVisibility(!visibility)}
            >
                <span className="flex flex-col">
                    <h1>Orders</h1>
                    <small className="text-gray-300">Your order history.</small>
                </span>
                {visibility ? (
                    <ChevronUpIcon className="h-5 w-5" />
                ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                )}
            </button>
            <div className={!visibility && 'hidden'}>
                <div className=" border border-gray-200 p-5 font-light dark:border-gray-700">
                    <p className="mb-2 text-justify font-normal text-neutral-700 dark:text-neutral-200"></p>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Product name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Color
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Category
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Accesories
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Available
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Price
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Weight
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                    <th
                                        scope="row"
                                        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                                    >
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td className="py-4 px-6">Sliver</td>
                                    <td className="py-4 px-6">Laptop</td>
                                    <td className="py-4 px-6">Yes</td>
                                    <td className="py-4 px-6">Yes</td>
                                    <td className="py-4 px-6">$2999</td>
                                    <td className="py-4 px-6">3.0 lb.</td>
                                </tr>
                                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                    <th
                                        scope="row"
                                        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                                    >
                                        Microsoft Surface Pro
                                    </th>
                                    <td className="py-4 px-6">White</td>
                                    <td className="py-4 px-6">Laptop PC</td>
                                    <td className="py-4 px-6">No</td>
                                    <td className="py-4 px-6">Yes</td>
                                    <td className="py-4 px-6">$1999</td>
                                    <td className="py-4 px-6">1.0 lb.</td>
                                </tr>
                                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                    <th
                                        scope="row"
                                        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                                    >
                                        Magic Mouse 2
                                    </th>
                                    <td className="py-4 px-6">Black</td>
                                    <td className="py-4 px-6">Accessories</td>
                                    <td className="py-4 px-6">Yes</td>
                                    <td className="py-4 px-6">No</td>
                                    <td className="py-4 px-6">$99</td>
                                    <td className="py-4 px-6">0.2 lb.</td>
                                </tr>
                                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                    <th
                                        scope="row"
                                        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                                    >
                                        Apple Watch
                                    </th>
                                    <td className="py-4 px-6">Black</td>
                                    <td className="py-4 px-6">Watches</td>
                                    <td className="py-4 px-6">Yes</td>
                                    <td className="py-4 px-6">No</td>
                                    <td className="py-4 px-6">$199</td>
                                    <td className="py-4 px-6">0.12 lb.</td>
                                </tr>
                                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                    <th
                                        scope="row"
                                        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                                    >
                                        Apple iMac
                                    </th>
                                    <td className="py-4 px-6">Silver</td>
                                    <td className="py-4 px-6">PC</td>
                                    <td className="py-4 px-6">Yes</td>
                                    <td className="py-4 px-6">Yes</td>
                                    <td className="py-4 px-6">$2999</td>
                                    <td className="py-4 px-6">7.0 lb.</td>
                                </tr>
                                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                    <th
                                        scope="row"
                                        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                                    >
                                        Apple AirPods
                                    </th>
                                    <td className="py-4 px-6">White</td>
                                    <td className="py-4 px-6">Accessories</td>
                                    <td className="py-4 px-6">No</td>
                                    <td className="py-4 px-6">Yes</td>
                                    <td className="py-4 px-6">$399</td>
                                    <td className="py-4 px-6">38 g</td>
                                </tr>
                                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                    <th
                                        scope="row"
                                        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                                    >
                                        iPad Pro
                                    </th>
                                    <td className="py-4 px-6">Gold</td>
                                    <td className="py-4 px-6">Tablet</td>
                                    <td className="py-4 px-6">No</td>
                                    <td className="py-4 px-6">Yes</td>
                                    <td className="py-4 px-6">$699</td>
                                    <td className="py-4 px-6">1.3 lb.</td>
                                </tr>
                                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                    <th
                                        scope="row"
                                        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                                    >
                                        Magic Keyboard
                                    </th>
                                    <td className="py-4 px-6">Black</td>
                                    <td className="py-4 px-6">Accessories</td>
                                    <td className="py-4 px-6">Yes</td>
                                    <td className="py-4 px-6">Yes</td>
                                    <td className="py-4 px-6">$99</td>
                                    <td className="py-4 px-6">453 g</td>
                                </tr>
                                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                    <th
                                        scope="row"
                                        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                                    >
                                        Apple TV 4K
                                    </th>
                                    <td className="py-4 px-6">Black</td>
                                    <td className="py-4 px-6">TV</td>
                                    <td className="py-4 px-6">Yes</td>
                                    <td className="py-4 px-6">No</td>
                                    <td className="py-4 px-6">$179</td>
                                    <td className="py-4 px-6">1.78 lb.</td>
                                </tr>
                                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                    <th
                                        scope="row"
                                        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                                    >
                                        AirTag
                                    </th>
                                    <td className="py-4 px-6">Silver</td>
                                    <td className="py-4 px-6">Accessories</td>
                                    <td className="py-4 px-6">Yes</td>
                                    <td className="py-4 px-6">No</td>
                                    <td className="py-4 px-6">$29</td>
                                    <td className="py-4 px-6">53 g</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Referrals(userObject) {
    const [visibility, setVisibility] = useState(false)

    return (
        <div>
            <button
                type="button"
                className="flex w-full items-center justify-between border border-gray-200 p-5 text-left text-xl text-black transition-all ease-in-out hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                onClick={() => setVisibility(!visibility)}
            >
                <span className="flex flex-col">
                    <h1>Referrals</h1>
                    <small className="text-gray-300">
                        Your referral history.
                    </small>
                </span>
                {visibility ? (
                    <ChevronUpIcon className="h-5 w-5" />
                ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                )}
            </button>
            <div className={!visibility && 'hidden'}>
                <div className=" border border-gray-200 p-5 font-light dark:border-gray-700">
                    <p className="mb-2 text-justify font-normal text-neutral-700 dark:text-neutral-200"></p>
                </div>
            </div>
        </div>
    )
}

function Integrations(userObject) {
    const [visibility, setVisibility] = useState(false)

    return (
        <div>
            <button
                type="button"
                className={`flex w-full items-center justify-between ${
                    !visibility && 'rounded-b-lg'
                } border border-gray-200 p-5 text-left text-xl text-black transition-all ease-in-out hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700`}
                onClick={() => setVisibility(!visibility)}
            >
                <span className="flex flex-col">
                    <h1>Integrations</h1>
                    <small className="text-gray-300">Your integrations.</small>
                </span>
                {visibility ? (
                    <ChevronUpIcon className="h-5 w-5" />
                ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                )}
            </button>
            <div className={!visibility && 'hidden'}>
                <div className="rounded-b-lg border border-gray-200 p-5 font-light dark:border-gray-700">
                    <p className="mb-2 text-justify font-normal text-neutral-700 dark:text-neutral-200"></p>
                </div>
            </div>
        </div>
    )
}

function Logout() {
    const { isAuthenticated, setLocalAuthentication } = useAuth()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function onLogout() {
        setLoading(true)
        const { status } = await fetch('/api/auth/logout')
        setLoading(false)

        if (status == 200) {
            setLocalAuthentication(false)
            router.replace('/')
        }
    }

    return (
        <button
            type="button"
            className="mt-6 w-full rounded-lg border border-gray-200 bg-neutral-100 py-3 text-lg text-neutral-400 transition-all duration-300 hover:bg-red-600 hover:text-white dark:border-gray-700 dark:bg-neutral-900 hover:dark:bg-red-600"
            onClick={onLogout}
        >
            {loading ? <Spinner /> : 'Logout'}
        </button>
    )
}

export async function getServerSideProps(context) {
    try {
        let decoded = null,
            user = null,
            omitted = null

        const { AJWT } = context.req.cookies

        if (AJWT) decoded = await decodeJWT(AJWT)

        if (decoded)
            user = await prisma.user.findUnique({
                where: {
                    id: decoded.id.toString(),
                },
                include: {
                    orders: true,
                    cart: true,
                    referralsProvided: true,
                    googleIntegration: true,
                    walletIntegration: true,
                },
            })

        if (user) omitted = omitUser(user)
        return {
            props: {
                auth: AJWT ? true : false,
                omitted: JSON.stringify(omitted),
            },
        }
    } catch (error) {
        return { props: {} }
    }
}
