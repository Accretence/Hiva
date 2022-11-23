import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { Web3ReactHooks } from '@web3-react/core'
import { GnosisSafe } from '@web3-react/gnosis-safe'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { WalletConnect } from '@web3-react/walletconnect'
import { useEffect, useState } from 'react'
import { getAddChainParameters, getName, CHAINS, URLS } from '../../lib/web3'
import { Accounts } from '../Accounts'
import { Chain } from '../Chain'
import { Status } from '../Status'
import { hooks, metaMask } from '../../connectors/metaMask'
import { useAuth } from 'state/Auth'
import { useRouter } from 'next/router'

const { useAccounts } = hooks

interface Props {
    connector: MetaMask | WalletConnect | CoinbaseWallet | Network | GnosisSafe
    chainId: ReturnType<Web3ReactHooks['useChainId']>
    isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
    isActive: ReturnType<Web3ReactHooks['useIsActive']>
    error: Error | undefined
    setError: (error: Error | undefined) => void
    ENSNames: ReturnType<Web3ReactHooks['useENSNames']>
    provider?: ReturnType<Web3ReactHooks['useProvider']>
    accounts?: string[]
    icon
    text: string
}

export function Connector({
    connector,
    chainId,
    isActivating,
    isActive,
    error,
    setError,
    ENSNames,
    provider,
    icon,
    text,
}: Props) {
    console.log(Object.values(connector))
    const accounts = useAccounts()
    const { isAuthenticated, setLocalAuthentication } = useAuth()
    const router = useRouter()
    const [toast, setToast] = useState(null)

    const isNetwork = connector instanceof Network
    const displayDefault = !isNetwork
    const chainIds = (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map(
        (chainId) => Number(chainId)
    )

    const [desiredChainId, setDesiredChainId] = useState<number>(
        isNetwork ? 1 : -1
    )

    async function attemptConnection() {
        setError(undefined)
        if (connector instanceof GnosisSafe) {
            connector
                .activate()
                .then(() => setError(undefined))
                .catch(setError)
        } else if (
            connector instanceof WalletConnect ||
            connector instanceof Network
        ) {
            connector
                .activate(desiredChainId === -1 ? undefined : desiredChainId)
                .then(() => setError(undefined))
                .catch(setError)
        } else {
            connector
                .activate(
                    desiredChainId === -1
                        ? undefined
                        : getAddChainParameters(desiredChainId)
                )
                .then(() => setError(undefined))
                .catch(setError)
        }
    }

    useEffect(() => {
        if (accounts && !isAuthenticated) onConnect(accounts[0])
    }, [isActivating])

    async function onConnect(wallet) {
        const res = await fetch(`/api/auth/wallet`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                wallet,
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

    return (
        <button
            onClick={() => {
                if (isActive) {
                    if (connector?.deactivate) {
                        void connector.deactivate()
                    } else {
                        void connector.resetState()
                    }
                } else attemptConnection()
            }}
            className="group flex items-center rounded-lg bg-gray-50 p-3 text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
        >
            {icon}
            <span className="ml-3 flex-1 whitespace-nowrap text-left font-medium">
                {error ? 'Try Again' : isActive ? 'Disconnect' : text}
            </span>
        </button>
    )
}
