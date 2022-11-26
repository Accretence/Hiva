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
import { getJWTPayload } from 'lib/jwt'
import { omitUser } from 'lib/omit'
import {
    DiscordIcon,
    GoogleBAWIcon,
    MetamaskIcon,
    Spinner,
} from 'components/Icons'
import { NextSeo } from 'next-seo'
import Modal from 'components/modals/Modal'
import Connect from 'components/modals/ConnectModal'
import Table from 'components/tables/Table'
import OrderTable from 'components/tables/OrderTable'

export default function User({ auth, omitted }) {
    const router = useRouter()
    const { isAuthenticated, setLocalAuthentication } = useAuth()
    const [userObject, setUserObject] = useState(
        (omitted && JSON.parse(omitted)) || null
    )

    useEffect(() => {
        setLocalAuthentication(auth)
    }, [])

    return (
        <>
            <NextSeo
                title="Simple Usage Example"
                description="A short description goes here."
            />
            {userObject && (
                <div className="rounded-lg bg-neutral-100 dark:bg-neutral-900">
                    <UserInfo userObject={userObject} />
                    <Orders userObject={userObject} />
                    <Referrals userObject={userObject} />
                    <Integrations userObject={userObject} />
                </div>
            )}
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
                <div className="border border-gray-200 p-5 font-light dark:border-gray-700 "></div>
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
                <div className="border border-gray-200 p-5 font-light dark:border-gray-700">
                    {userObject && userObject['orders'] && (
                        <OrderTable orders={userObject.orders} />
                    )}
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
                <div className=" border border-gray-200 p-5 font-light dark:border-gray-700"></div>
            </div>
        </div>
    )
}

function Integrations(userObject) {
    const [visibility, setVisibility] = useState(false)
    const [connectModalVisibility, setConnectModalVisibility] = useState(false)

    return (
        <>
            <Modal
                title="Connect Wallet"
                modalVisibility={connectModalVisibility}
                setModalVisibility={setConnectModalVisibility}
            >
                <Connect />
            </Modal>
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
                    <div className="p-2">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <a
                                href="#"
                                className="group flex items-center rounded-lg bg-gray-50 py-3 px-6  text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                            >
                                <GoogleBAWIcon />
                                <span className="ml-3 flex-1 whitespace-nowrap font-medium">
                                    Google Integration
                                </span>
                            </a>
                            <a
                                href="#"
                                className="group flex items-center rounded-lg bg-gray-50 p-3 text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                            >
                                <DiscordIcon />
                                <span className="ml-3 flex-1 whitespace-nowrap font-medium">
                                    Discord Integration
                                </span>
                            </a>
                            <button
                                onClick={() => setConnectModalVisibility(true)}
                                className="group flex items-center rounded-lg bg-gray-50 py-3 px-6 text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                            >
                                <MetamaskIcon />
                                <span className=" ml-3 flex-1 whitespace-nowrap text-left font-medium">
                                    Web3 Wallet Integration
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
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
        const { AJWT } = context.req.cookies

        if (AJWT) {
            const decoded = await getJWTPayload(AJWT)

            if (decoded) {
                const user = await prisma.user.findUnique({
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

                if (user) {
                    const omitted = omitUser(user)
                    return {
                        props: {
                            auth: AJWT ? true : false,
                            omitted: JSON.stringify(omitted),
                        },
                    }
                }
            }
        }

        return { props: {} }
    } catch (error) {
        return { props: {} }
    }
}
