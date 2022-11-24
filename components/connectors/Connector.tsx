import { MetamaskIcon, WalletConnectIcon } from 'components/Icons'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from 'state/Auth'
import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
} from 'wagmi'

export default function Connector() {
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect()
    const { address, connector, isConnected } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })
    const { disconnect } = useDisconnect()
    const { isAuthenticated, setLocalAuthentication } = useAuth()
    const router = useRouter()
    const [toast, setToast] = useState(null)

    useEffect(() => {
        if (isConnected && address) onConnect(address)
    }, [isConnected])

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

    if (isConnected) {
        return (
            <div>
                <img src={ensAvatar} alt="ENS Avatar" />
                <div>{ensName ? `${ensName} (${address})` : address}</div>
                <div>Connected to {connector.name}</div>
                <button onClick={() => disconnect()}>Disconnect</button>
            </div>
        )
    } else
        return (
            <>
                {connectors.map((connector) => {
                    let icon
                    switch (connector.name) {
                        case 'MetaMask':
                            icon = <MetamaskIcon />
                            break
                        case 'WalletConnect':
                            icon = <WalletConnectIcon />
                            break
                    }
                    return (
                        <button
                            disabled={!connector.ready}
                            key={connector.id}
                            onClick={() => connect({ connector })}
                            className="group flex items-center rounded-lg bg-gray-50 p-3 text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                        >
                            {!connector.ready && ' (unsupported)'}
                            {isLoading &&
                                connector.id === pendingConnector?.id &&
                                ' (connecting)'}
                            {icon}
                            <span className="ml-3 flex-1 whitespace-nowrap text-left font-medium">
                                {error
                                    ? 'Try Again'
                                    : isLoading
                                    ? 'Disconnect'
                                    : connector.name}
                            </span>
                        </button>
                    )
                })}
            </>
        )
}
