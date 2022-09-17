import { useEffect, useRef, useState } from 'react'
import Image from 'next/future/image'
import Link from 'next/link'

import prisma from 'lib/prisma'
import fetcher from 'lib/fetcher'
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
import { Spinner } from 'components/Icons'
import Helmet from 'components/Helmet'

export default function User({ auth }) {
    const router = useRouter()
    const { isAuthenticated, setLocalAuthentication } = useAuth()

    useEffect(() => {
        setLocalAuthentication(auth)
    }, [])

    return (
        <>
            <Helmet />
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
                className="flex w-full items-center justify-between rounded-t-lg border border-gray-200 p-5 text-left text-xl text-black hover:bg-gray-100  focus:ring-4 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
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
                <div className="border border-gray-200 p-5 font-light dark:border-gray-700 ">
                    <p className="mb-2 text-justify font-normal text-neutral-700 dark:text-neutral-200"></p>
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
                className="delay-550 flex w-full items-center justify-between border border-gray-200 p-5 text-left text-xl text-black transition-all ease-in-out hover:bg-gray-100  focus:ring-4 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                aria-expanded="true"
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
                className="delay-550 flex w-full items-center justify-between border border-gray-200 p-5 text-left text-xl text-black transition-all ease-in-out hover:bg-gray-100  focus:ring-4 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
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
                <div className=" border border-gray-200 p-5 font-light dark:border-gray-700">
                    <p className="mb-2 text-justify font-normal text-neutral-700 dark:text-neutral-200"></p>
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
                className={`delay-550 flex w-full items-center justify-between ${
                    !visibility && 'rounded-b-lg'
                } border border-gray-200 p-5 text-left text-xl text-black transition-all ease-in-out hover:bg-gray-100  focus:ring-4 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700`}
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
            aria-expanded="true"
            onClick={onLogout}
        >
            {loading ? <Spinner /> : 'Logout'}
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
