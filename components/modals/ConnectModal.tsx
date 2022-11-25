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
import { QuestionIcon } from 'components/Icons'
import Connector from 'components/Connector'

export default function Connect() {
    const router = useRouter()
    const { isAuthenticated, setLocalAuthentication } = useAuth()

    const [toast, setToast] = useState(null)

    return (
        <div className="mt-4 px-8">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <Connector />
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
