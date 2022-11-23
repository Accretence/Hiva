import { useEffect, useState } from 'react'
import { hooks, network } from '../../connectors/network'
import { Connector } from './Connector'

const {
    useChainId,
    useAccounts,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
} = hooks

export default function Network() {
    const chainId = useChainId()
    const accounts = useAccounts()
    const isActivating = useIsActivating()

    const isActive = useIsActive()

    const provider = useProvider()
    const ENSNames = useENSNames(provider)

    const [error, setError] = useState(undefined)

    // attempt to connect eagerly on mount
    useEffect(() => {
        void network.activate().catch(() => {
            console.debug('Failed to connect to network')
        })
    }, [])

    return (
        <Connector
            connector={network}
            chainId={chainId}
            isActivating={isActivating}
            isActive={isActive}
            error={error}
            setError={setError}
            accounts={accounts}
            provider={provider}
            ENSNames={ENSNames}
            icon={null}
            text={null}
        />
    )
}
