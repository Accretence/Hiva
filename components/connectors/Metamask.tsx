import { MetamaskIcon } from 'components/Icons'
import { useEffect, useState } from 'react'
import { hooks, metaMask } from '../../connectors/metaMask'
import { Connector } from './Connector'

const {
    useChainId,
    useAccounts,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
} = hooks

export default function Metamask() {
    const chainId = useChainId()
    const accounts = useAccounts()
    const isActivating = useIsActivating()
    const isActive = useIsActive()
    const provider = useProvider()
    const ENSNames = useENSNames(provider)

    const [error, setError] = useState(undefined)

    // attempt to connect eagerly on mount
    useEffect(() => {
        void metaMask.connectEagerly().catch(() => {
            console.debug('Failed to connect eagerly to metamask...')
        })
    }, [])

    return (
        <Connector
            connector={metaMask}
            chainId={chainId}
            isActivating={isActivating}
            isActive={isActive}
            error={error}
            setError={setError}
            accounts={accounts}
            provider={provider}
            ENSNames={ENSNames}
            icon={<MetamaskIcon />}
            text="Metamask"
        />
    )
}
