import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '../../state/Auth'

import i18n from 'i18n.config'
import config from 'main.config'

export default function Forgot() {
    const router = useRouter()
    const { locale = config['defaultLocale'] } = useRouter()

    const { title, description } = i18n['pages']['reset']

    const [loading, setLoading] = useState(false)
    const [nextStage, setNextStage] = useState(false)
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')

    async function onForgot() {
        setLoading(true)
    }

    async function onReset() {
        setLoading(true)
    }

    return <div></div>
}
