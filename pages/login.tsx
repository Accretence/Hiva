import { useEffect, useRef, useState } from 'react'
import Image from 'next/future/image'
import Link from 'next/link'

import prisma from 'lib/prisma'
import { Form, FormState, Subscribers } from 'lib/types'
import fetcher from 'lib/fetcher'
import ErrorMessage from 'components/ErrorMessage'
import SuccessMessage from 'components/SuccessMessage'
import useSWR from 'swr'
import gradient from 'lib/gradient'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
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

    const [registerVisibility, setRegisterVisibility] = useState(false)
    const [loginVisibility, setLoginVisibility] = useState(false)
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

    return (
        <div className="flex flex-col ">
            <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
                <div>
                    <div className="bg-neutral-100 dark:bg-neutral-900">
                        <button
                            type="button"
                            className="flex w-full items-center justify-between rounded-t-lg border border-gray-200 p-5 text-left text-xl text-black hover:bg-gray-100  focus:ring-4 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                            aria-expanded="true"
                            onClick={() => {
                                setLoginVisibility(!loginVisibility)
                                setRegisterVisibility(false)
                            }}
                        >
                            <span className="flex flex-col">
                                <h1>Login</h1>
                                <small className="text-gray-300">
                                    Login with Email/ Password.
                                </small>
                            </span>
                            {loginVisibility ? (
                                <ChevronUpIcon className="h-5 w-5" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5" />
                            )}
                        </button>
                        <div className={!loginVisibility && 'hidden'}>
                            <div className="border border-gray-200 p-5 font-light dark:border-gray-700 ">
                                <form onSubmit={onLogin}>
                                    <div className="mb-6">
                                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Email address
                                        </label>
                                        <input
                                            ref={emailRef}
                                            type="email"
                                            id="email"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                            placeholder="example@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Password
                                        </label>
                                        <input
                                            ref={passwordRef}
                                            type="password"
                                            id="password"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                            placeholder="•••••••••"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-2.5 text-center font-medium text-neutral-100 transition duration-300 hover:bg-neutral-900 hover:text-neutral-100  dark:hover:bg-neutral-100 hover:dark:text-neutral-900"
                                    >
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="bg-neutral-100 dark:bg-neutral-900">
                        <button
                            type="button"
                            className={`flex w-full items-center justify-between ${
                                !registerVisibility && 'rounded-b-lg'
                            } border border-gray-200 p-5 text-left text-xl text-black hover:bg-gray-100  focus:ring-4 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700`}
                            aria-expanded="true"
                            onClick={() => {
                                setRegisterVisibility(!registerVisibility)
                                setLoginVisibility(false)
                            }}
                        >
                            <span className="flex flex-col">
                                <h1>Register</h1>
                                <small className="text-gray-300">
                                    Register with Email/ Password.
                                </small>
                            </span>
                            {registerVisibility ? (
                                <ChevronUpIcon className="h-5 w-5" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5" />
                            )}
                        </button>
                        <div className={!registerVisibility && 'hidden'}>
                            <div className="border border-gray-200 p-5 font-light dark:border-gray-700 ">
                                <form onSubmit={onRegister}>
                                    <div className="mb-6">
                                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Email address
                                        </label>
                                        <input
                                            ref={emailRef}
                                            type="email"
                                            id="email"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                            placeholder="example@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Password
                                        </label>
                                        <input
                                            ref={passwordRef}
                                            type="password"
                                            id="password"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                            placeholder="•••••••••"
                                            required
                                        />
                                    </div>
                                    <div className="mb-6 flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input
                                                id="remember"
                                                type="checkbox"
                                                value=""
                                                className="focus:ring-3 h-5 w-5 rounded border border-gray-300 bg-gray-50 accent-purple-500  dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 "
                                                required
                                            />
                                        </div>
                                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                            I agree with the{' '}
                                            <a
                                                href="#"
                                                className="bg-gradient-to-br from-purple-500 to-pink-600 bg-clip-text text-transparent"
                                            >
                                                terms and conditions
                                            </a>
                                            .
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-2.5 text-center font-medium text-neutral-100 transition duration-300 hover:bg-neutral-900 hover:text-neutral-100  dark:hover:bg-neutral-100 hover:dark:text-neutral-900"
                                    >
                                        Register
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="inline-flex w-full items-center justify-center">
                        <hr className="my-4 h-px w-64 border-0 bg-neutral-300 dark:bg-gray-600" />
                    </div>
                    <a href={getGoogleURL()}>
                        <button className="block w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600  py-3.5 font-normal text-neutral-100 transition duration-300 hover:bg-neutral-100 hover:text-neutral-900 hover:dark:text-neutral-100">
                            Sign-in with Google
                        </button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const { AJWT } = ctx.req.cookies

    return {
        props: { auth: AJWT ? true : false },
    }
}
