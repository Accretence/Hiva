import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { useEffect, useState } from 'react'
import { useAuth } from 'state/Auth'

import i18n from 'i18n.config'
import config from 'main.config'

export default function Cart() {
    const router = useRouter()
    const { locale = config['defaultLocale'] } = useRouter()

    const { title, description } = i18n['pages']['cart']

    const [loading, setLoading] = useState(false)
    const [nextStage, setNextStage] = useState(false)
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <NextSeo title={title[locale]} description={description[locale]} />
        </>
    )
}
