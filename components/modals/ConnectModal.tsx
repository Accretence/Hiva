import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { hooks, metaMask } from '../../connectors/metaMask'

import fetcher from 'lib/fetcher'

import gradient from 'lib/gradient'
import { useRouter } from 'next/router'
import { getGoogleURL } from 'lib/google'

import { useAuth } from 'state/Auth'

import { getButtonStyles } from 'lib/styles'
import { QuestionIcon } from 'components/Icons'
import Metamask from 'components/connectors/Metamask'
import CoinbaseWallet from 'components/connectors/CoinbaseWallet'
import WalletConnect from 'components/connectors/WalletConnect'
import GnosisSafe from 'components/connectors/GnosisSafe'

export default function Connect() {
    const router = useRouter()
    const { isAuthenticated, setLocalAuthentication } = useAuth()

    const [toast, setToast] = useState(null)

    return (
        <div className="mt-4 px-8">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <Metamask />
                <CoinbaseWallet />
                <WalletConnect />
                <GnosisSafe />
            </div>
            <div className="my-6">
                <a
                    href="#"
                    className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
                >
                    <QuestionIcon />
                    Why do I need to connect with my wallet?
                </a>
            </div>
        </div>
    )
}
