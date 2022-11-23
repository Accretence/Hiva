import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

import fetcher from 'lib/fetcher'

import gradient from 'lib/gradient'
import { useRouter } from 'next/router'
import { getGoogleURL } from 'lib/google'

import { useAuth } from 'state/Auth'

import CoinbaseWalletCard from '../cards/CoinbaseWalletCard'
import GnosisSafeCard from '../cards/GnosisSafeCard'
import MetaMaskCard from '../cards/MetaMaskCard'
import NetworkCard from '../cards/NetworkCard'
import WalletConnectCard from '../cards/WalletConnectCard'
import ProviderExample from '../ProviderExample'
import { getButtonStyles } from 'lib/styles'
import {
    CoinbaseIcon,
    GnosisIcon,
    MetamaskIcon,
    WalletConnectIcon,
} from 'components/Icons'

export default function Connect() {
    const router = useRouter()
    const { isAuthenticated, setLocalAuthentication } = useAuth()

    const [toast, setToast] = useState(null)
    const [registerVisibility, setRegisterVisibility] = useState(false)
    const [loginVisibility, setLoginVisibility] = useState(false)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const onLogin = async (e) => {
        e.preventDefault()

        const res = await fetch(`/api/auth/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }),
        })

        const json = await res.json()
        const { error } = json

        if (error) {
            setToast(error.message)
        } else {
            setLocalAuthentication(true)
            router.replace('/')
            setToast('Successfully logged in.')
        }
    }

    const onRegister = async (e) => {
        e.preventDefault()

        const res = await fetch(`/api/auth/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }),
        })

        const { error } = await res.json()

        if (error) {
            setToast(error.message)
        } else {
            setLocalAuthentication(true)
            router.replace('/')
            setToast('Successfully logged in.')
        }
    }

    return (
        <div className="px-6 pb-6 pt-0">
            <ul className="my-4 space-y-3">
                <li>
                    <a
                        href="#"
                        className="group flex items-center rounded-lg bg-gray-50 p-3  text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                    >
                        <MetamaskIcon />
                        <span className="ml-3 flex-1 whitespace-nowrap">
                            MetaMask
                        </span>
                        <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                            Popular
                        </span>
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="group flex items-center rounded-lg bg-gray-50 p-3 text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                    >
                        <CoinbaseIcon />
                        <span className="ml-3 flex-1 whitespace-nowrap">
                            Coinbase Wallet
                        </span>
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="group flex items-center rounded-lg bg-gray-50 p-3 text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                    >
                        <WalletConnectIcon />
                        <span className="ml-3 flex-1 whitespace-nowrap">
                            WalletConnect
                        </span>
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="group flex items-center rounded-lg bg-gray-50 p-3 text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                    >
                        <GnosisIcon />
                        <span className="ml-3 flex-1 whitespace-nowrap">
                            Gnosis Safe
                        </span>
                    </a>
                </li>
            </ul>
            <div>
                <a
                    href="#"
                    className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
                >
                    <svg
                        aria-hidden="true"
                        className="mr-2 h-3 w-3"
                        focusable="false"
                        data-prefix="far"
                        data-icon="question-circle"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path
                            fill="currentColor"
                            d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"
                        />
                    </svg>
                    Why do I need to connect with my wallet?
                </a>
            </div>
        </div>
    )
}
