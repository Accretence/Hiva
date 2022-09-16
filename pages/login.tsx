import { useEffect, useRef, useState } from 'react'
import Image from 'next/future/image'
import Link from 'next/link'

import prisma from 'lib/prisma'
import { Form, FormState, Subscribers } from 'lib/types'
import fetcher from 'lib/fetcher'
import { GoogleIcon, LoadingSpinner } from 'components/Icons'
import ErrorMessage from 'components/ErrorMessage'
import SuccessMessage from 'components/SuccessMessage'
import useSWR from 'swr'
import gradient from 'lib/gradient'
import { ChevronUpIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { getGoogleURL } from 'lib/google'
import { useAuth } from 'state/Auth'

export default function Login({ auth }) {
    const router = useRouter()
    const { isAuthenticated, setLocalAuthentication } = useAuth()

    useEffect(() => {
        setLocalAuthentication(auth)
        if (auth) router.replace('/')
    }, [])

    const [form, setForm] = useState<FormState>({ state: Form.Initial })
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const onLogin = async (e) => {
        e.preventDefault()
        setForm({ state: Form.Loading })

        const res = await fetch(`/api/auth/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }),
        })

        const { error } = await res.json()

        if (error) {
            setForm({
                state: Form.Error,
                message: error,
            })
            return
        } else {
            router.replace('/')
        }
    }

    const onRegister = async (e) => {
        e.preventDefault()
        setForm({ state: Form.Loading })

        const res = await fetch(`/api/auth/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }),
        })

        const { error } = await res.json()

        if (error) {
            setForm({
                state: Form.Error,
                message: error,
            })
            return
        } else {
            router.replace('/')
        }
    }

    return <div></div>
}

export async function getServerSideProps(ctx) {
    const { AJWT } = ctx.req.cookies

    return {
        props: { auth: AJWT ? true : false },
    }
}
