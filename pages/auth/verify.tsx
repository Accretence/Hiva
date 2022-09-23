import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

import { useAuth } from 'state/Auth'

import i18n from 'i18n.config'
import config from 'main.config'

export default function Verify() {
    const router = useRouter()
    const { locale = config['defaultLocale'] } = useRouter()

    const { title, description } = i18n['pages']['verify']

    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState('')

    async function onVerify() {
        setLoading(true)

        const res = await fetch(`/api/auth/verify`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                code,
            }),
        })

        const { error } = await res.json()

        if (error) {
        } else {
        }
    }

    return (
        <>
            <NextSeo title={title[locale]} description={description[locale]} />
            {title[locale]}
            {description[locale]}
        </>
    )
}
