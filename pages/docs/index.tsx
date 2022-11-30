import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import prisma from 'lib/prisma'
import fetcher from 'lib/fetcher'
import useSWR from 'swr'
import {
    ChevronDownIcon,
    ChevronUpIcon,
    WalletIcon,
} from '@heroicons/react/24/solid'
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
import ConnectModal from 'components/modals/ConnectModal'
import Table from 'components/tables/Table'
import OrderTable from 'components/tables/OrderTable'
import { getDiscordURL } from 'lib/discord'
import Sidebar from 'components/docs/sidebar'

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

export async function getStaticProps(context) {
    const doc = {
        'Getting Started': [
            {
                title: 'Welcome',
                route: '/docs/welcome',
            },
            {
                title: 'How to create an account?',
                route: '/docs/how-to-create-an-account',
            },
            {
                title: 'What is a wallet?',
                route: '/docs/what-is-a-wallet',
            },
        ],
        Coin: [
            {
                title: 'What is Coin?',
                route: '/docs/coin',
            },
            {
                title: 'What is coin used for?',
                route: '/docs/what-is-coin-used-for',
            },
            {
                title: 'Buying and selling coin',
                route: '/docs/buying-and-selling-coin',
            },
        ],
    }

    try {
        return {
            props: { doc: JSON.stringify(doc) },
        }
    } catch (error) {
        return { props: {} }
    }
}

function getActiveButtonStyles() {
    return 'group flex items-center rounded-md bg-purple-700 py-3 px-6 text-gray-100 transition duration-300 hover:bg-black'
}

function getDisabledButtonStyles() {
    return 'no-scrollbar group flex items-center overflow-x-auto rounded-md border-2 border-solid border-gray-300/50 bg-transparent py-3 px-6 text-gray-300/50 dark:border-gray-500 dark:text-gray-500'
}
