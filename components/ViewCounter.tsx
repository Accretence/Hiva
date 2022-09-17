import { useEffect } from 'react'
import useSWR from 'swr'

import fetcher from 'lib/fetcher'
import { Views } from 'lib/types'

export default function ViewCounter({ id }) {
    const { data } = useSWR<Views>(`/api/views/${id}`, fetcher)
    const views = new Number(data?.total)

    useEffect(() => {
        const registerView = () =>
            fetch(`/api/views/${id}`, {
                method: 'POST',
            })

        registerView()
    }, [id])

    return <span>{`${views > 0 ? views.toLocaleString() : '–––'} views`}</span>
}
