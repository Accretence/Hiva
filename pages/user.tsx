import { useEffect, useRef, useState } from 'react'
import Image from 'next/future/image'
import Link from 'next/link'

import prisma from 'lib/prisma'
import fetcher from 'lib/fetcher'
import { GoogleIcon, LoadingSpinner } from 'components/Icons'
import ErrorMessage from 'components/ErrorMessage'
import SuccessMessage from 'components/SuccessMessage'
import useSWR from 'swr'
import gradient from 'lib/gradient'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { getGoogleURL } from 'lib/google'
import { useAuth } from 'state/Auth'
import { verifyJWT } from 'lib/jwt'
import { omitUser } from 'lib/omit'

export default function User({ auth }) {
    const router = useRouter()
    const { isAuthenticated, setLocalAuthentication } = useAuth()

    useEffect(() => {
        setLocalAuthentication(auth)
    }, [])

    return (
        <>
            <div className="rounded-lg bg-neutral-100 dark:bg-neutral-900">
                <UserInfo />
                <Orders />
                <Referrals />
                <Integrations />
            </div>
            <Logout />
        </>
    )
}

function UserInfo() {
    const [visibility, setVisibility] = useState(false)

    return (
        <div>
            <button
                type="button"
                className="flex items-center justify-between w-full p-5 text-xl text-left text-black border border-gray-200 rounded-t-lg focus:ring-4  dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-expanded="true"
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
                <div className="p-5 font-light border border-gray-200 dark:border-gray-700 ">
                    <p className="text-justify font-normal mb-2 text-neutral-700 dark:text-neutral-200">
                        Flowbite is an open-source library of interactive
                        components built on top of Tailwind CSS including
                        buttons, dropdowns, modals, navbars, and more. Check out
                        this guide to learn how to{' '}
                        <a
                            href="/docs/getting-started/introduction/"
                            className="text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            get started
                        </a>{' '}
                        and start developing websites even faster with
                        components on top of Tailwind CSS.
                    </p>
                </div>
            </div>
        </div>
    )
}

function Orders() {
    const [visibility, setVisibility] = useState(false)

    return (
        <div>
            <button
                type="button"
                className="transition-all ease-in-out delay-550 flex items-center justify-between w-full p-5 text-xl text-left text-black border border-gray-200 focus:ring-4  dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-expanded="true"
                onClick={() => setVisibility(!visibility)}
            >
                <span className="flex flex-col">
                    <h1>Order</h1>
                    <small className="text-gray-300">Your order history.</small>
                </span>
                {visibility ? (
                    <ChevronUpIcon className="h-5 w-5" />
                ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                )}
            </button>
            <div className={!visibility && 'hidden'}>
                <div className="rounded-b-lg p-5 font-light border border-gray-200 dark:border-gray-700">
                    <p className="font-normal text-justify mb-2 text-gray-500 dark:text-gray-400">
                        Flowbite is an open-source library of interactive
                        components built on top of Tailwind CSS including
                        buttons, dropdowns, modals, navbars, and more. Check out
                        this guide to learn how to{' '}
                        <a
                            href="/docs/getting-started/introduction/"
                            className="text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            get started
                        </a>{' '}
                        and start developing websites even faster with
                        components on top of Tailwind CSS.
                    </p>
                </div>
            </div>
        </div>
    )
}

function Referrals() {
    const [visibility, setVisibility] = useState(false)

    return (
        <div>
            <button
                type="button"
                className="transition-all ease-in-out delay-550 flex items-center justify-between w-full p-5 text-xl text-left text-black border border-gray-200 focus:ring-4  dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-expanded="true"
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
                <div className="rounded-b-lg p-5 font-light border border-gray-200 dark:border-gray-700">
                    <p className="font-normal text-justify mb-2 text-gray-500 dark:text-gray-400">
                        Flowbite is an open-source library of interactive
                        components built on top of Tailwind CSS including
                        buttons, dropdowns, modals, navbars, and more. Check out
                        this guide to learn how to{' '}
                        <a
                            href="/docs/getting-started/introduction/"
                            className="text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            get started
                        </a>{' '}
                        and start developing websites even faster with
                        components on top of Tailwind CSS.
                    </p>
                </div>
            </div>
        </div>
    )
}

function Integrations() {
    const [visibility, setVisibility] = useState(false)

    return (
        <div>
            <button
                type="button"
                className="rounded-b-lg transition-all ease-in-out delay-550 flex items-center justify-between w-full p-5 text-xl text-left text-black border border-gray-200 focus:ring-4  dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-expanded="true"
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
                <div className="rounded-b-lg p-5 font-light border border-gray-200 dark:border-gray-700">
                    <p className="font-normal text-justify mb-2 text-gray-500 dark:text-gray-400">
                        Flowbite is an open-source library of interactive
                        components built on top of Tailwind CSS including
                        buttons, dropdowns, modals, navbars, and more. Check out
                        this guide to learn how to{' '}
                        <a
                            href="/docs/getting-started/introduction/"
                            className="text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            get started
                        </a>{' '}
                        and start developing websites even faster with
                        components on top of Tailwind CSS.
                    </p>
                </div>
            </div>
        </div>
    )
}

function Logout() {
    return (
        <button
            type="button"
            className="mt-6 rounded-lg w-full py-2 text-xl bg-neutral-100 border-gray-200 dark:bg-neutral-900 text-neutral-400 hover:bg-red-600 hover:text-white hover:dark:bg-red-600 border dark:border-gray-700 transition-all duration-500"
            aria-expanded="true"
        >
            LOGOUT
        </button>
    )
}

export async function getServerSideProps(ctx) {
    let decoded = null,
        user = null,
        omitted = null

    const { AJWT } = ctx.req.cookies

    if (AJWT) decoded = await verifyJWT(AJWT)

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
            },
        })

    if (user) omitted = omitUser(user)
    return {
        props: { auth: AJWT ? true : false, omitted },
    }
}
