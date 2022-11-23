import { GnosisIcon } from 'components/Icons'
import { useEffect, useState } from 'react'
import { gnosisSafe, hooks } from '../../connectors/gnosisSafe'
import { Connector } from './Connector'

const {
    useChainId,
    useAccounts,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
} = hooks

export default function GnosisSafe() {
    const chainId = useChainId()
    const accounts = useAccounts()
    const isActivating = useIsActivating()

    const isActive = useIsActive()

    const provider = useProvider()
    const ENSNames = useENSNames(provider)

    const [error, setError] = useState(undefined)

    // attempt to connect eagerly on mount
    useEffect(() => {
        void gnosisSafe.connectEagerly().catch(() => {
            console.debug('Failed to connect eagerly to gnosis safe')
        })
    }, [])

    return (
        <Connector
            connector={gnosisSafe}
            chainId={chainId}
            isActivating={isActivating}
            isActive={isActive}
            error={error}
            setError={setError}
            accounts={accounts}
            provider={provider}
            ENSNames={ENSNames}
            icon={<GnosisIcon />}
            text="Gnosis Safe"
        />
    )
}
