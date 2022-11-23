import type { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import type { Web3ReactHooks } from '@web3-react/core'
import { GnosisSafe } from '@web3-react/gnosis-safe'
import type { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { WalletConnect } from '@web3-react/walletconnect'
import { useCallback, useEffect, useState } from 'react'
import { CHAINS, getAddChainParameters, URLS } from '../lib/web3'
import { hooks, metaMask } from '../connectors/metaMask'
import { useAuth } from 'state/Auth'
import { useRouter } from 'next/router'

const {
    useChainId,
    useAccounts,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
} = hooks

export function ConnectWithSelect({
    connector,
    chainId,
    isActivating,
    isActive,
    error,
    setError,
}: {
    connector: MetaMask | WalletConnect | CoinbaseWallet | Network | GnosisSafe
    chainId: ReturnType<Web3ReactHooks['useChainId']>
    isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
    isActive: ReturnType<Web3ReactHooks['useIsActive']>
    error: Error | undefined
    setError: (error: Error | undefined) => void
}) {
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

    if (error) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '1rem' }} />
                <button onClick={attemptConnection}>Try Again?</button>
            </div>
        )
    } else if (isActive) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '1rem' }} />
                <button
                    onClick={() => {
                        if (connector?.deactivate) {
                            void connector.deactivate()
                        } else {
                            void connector.resetState()
                        }
                    }}
                >
                    Disconnect
                </button>
            </div>
        )
    } else {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '1rem' }} />
                <button onClick={attemptConnection} disabled={isActivating}>
                    Connect
                </button>
            </div>
        )
    }
}