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

function ChainSelect({
    chainId,
    switchChain,
    displayDefault,
    chainIds,
}: {
    chainId: number
    switchChain: (chainId: number) => void | undefined
    displayDefault: boolean
    chainIds: number[]
}) {
    return (
        <select
            value={chainId}
            onChange={(event) => {
                switchChain?.(Number(event.target.value))
            }}
            disabled={switchChain === undefined}
        >
            {displayDefault ? <option value={-1}>Default Chain</option> : null}
            {chainIds.map((chainId) => (
                <option key={chainId} value={chainId}>
                    {CHAINS[chainId]?.name ?? chainId}
                </option>
            ))}
        </select>
    )
}

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

    const switchChain = useCallback(
        (desiredChainId: number) => {
            setDesiredChainId(desiredChainId)
            // if we're already connected to the desired chain, return
            if (desiredChainId === chainId) {
                setError(undefined)
                return
            }

            // if they want to connect to the default chain and we're already connected, return
            if (desiredChainId === -1 && chainId !== undefined) {
                setError(undefined)
                return
            }

            if (
                connector instanceof WalletConnect ||
                connector instanceof Network
            ) {
                connector
                    .activate(
                        desiredChainId === -1 ? undefined : desiredChainId
                    )
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
        },
        [connector, chainId, setError]
    )

    const onClick = useCallback((): void => {
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
    }, [connector, desiredChainId, setError])

    useEffect(() => {
        if (accounts && !isAuthenticated) onConnect(accounts[0])
    }, [accounts])

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
                {!(connector instanceof GnosisSafe) && (
                    <ChainSelect
                        chainId={desiredChainId}
                        switchChain={switchChain}
                        displayDefault={displayDefault}
                        chainIds={chainIds}
                    />
                )}
                <div style={{ marginBottom: '1rem' }} />
                <button onClick={onClick}>Try Again?</button>
            </div>
        )
    } else if (isActive) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {!(connector instanceof GnosisSafe) && (
                    <ChainSelect
                        chainId={desiredChainId === -1 ? -1 : chainId}
                        switchChain={switchChain}
                        displayDefault={displayDefault}
                        chainIds={chainIds}
                    />
                )}
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
                {!(connector instanceof GnosisSafe) && (
                    <ChainSelect
                        chainId={desiredChainId}
                        switchChain={isActivating ? undefined : switchChain}
                        displayDefault={displayDefault}
                        chainIds={chainIds}
                    />
                )}
                <div style={{ marginBottom: '1rem' }} />
                <button
                    onClick={
                        isActivating
                            ? undefined
                            : () =>
                                  connector instanceof GnosisSafe
                                      ? void connector
                                            .activate()
                                            .then(() => setError(undefined))
                                            .catch(setError)
                                      : connector instanceof WalletConnect ||
                                        connector instanceof Network
                                      ? connector
                                            .activate(
                                                desiredChainId === -1
                                                    ? undefined
                                                    : desiredChainId
                                            )
                                            .then(() => setError(undefined))
                                            .catch(setError)
                                      : connector
                                            .activate(
                                                desiredChainId === -1
                                                    ? undefined
                                                    : getAddChainParameters(
                                                          desiredChainId
                                                      )
                                            )
                                            .then(() => {
                                                setError(undefined)
                                            })
                                            .catch(setError)
                    }
                    disabled={isActivating}
                >
                    Connect
                </button>
            </div>
        )
    }
}
