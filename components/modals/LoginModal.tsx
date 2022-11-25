import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

import fetcher from 'lib/fetcher'

import gradient from 'lib/gradient'
import { useRouter } from 'next/router'
import { getGoogleURL } from 'lib/google'

import { useAuth } from 'state/Auth'

import { getButtonStyles } from 'lib/styles'
import {
    CoinbaseIcon,
    DiscordIcon,
    GnosisIcon,
    GoogleBAWIcon,
    GoogleColorIcon,
    MetamaskIcon,
    WalletConnectIcon,
} from 'components/Icons'

export default function LoginModal() {
    return (
        <div className="px-6 pt-0 pb-6">
            <a
                href={getGoogleURL()}
                className="group mb-2 flex rounded-lg bg-purple-600 px-3 pt-3 pb-2 text-white hover:animate-pulse"
            >
                <GoogleBAWIcon />
                <span className="ml-3 mt-0 whitespace-nowrap font-medium">
                    Login with Google
                </span>
            </a>
            <small className="text-xs font-normal text-gray-500  dark:text-gray-400">
                By signing in, you agree to our{' '}
                <Link
                    className="font-semibold text-purple-500 hover:text-purple-300"
                    href="/terms"
                >
                    terms of service
                </Link>
                .
            </small>
        </div>
    )
}
