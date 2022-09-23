import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { useAuth } from 'state/Auth'

import i18n from 'i18n.config'
import config from 'main.config'

export default function Subscription() {
    const { locale = config['defaultLocale'] } = useRouter()
    const { isAuthenticated } = useAuth()

    const { title, description } = i18n['pages']['subscription']

    const [loading, setLoading] = useState(false)

    async function onSubscribe() {
        setLoading(true)
    }

    return (
        <>
            <NextSeo title={title[locale]} description={description[locale]} />
            {title[locale]}
            {description[locale]}
        </>
    )
}
