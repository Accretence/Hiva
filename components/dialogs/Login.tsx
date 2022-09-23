import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

import fetcher from 'lib/fetcher'

import gradient from 'lib/gradient'
import { useRouter } from 'next/router'
import { getGoogleURL } from 'lib/google'

import { useAuth } from 'state/Auth'

export default function Login() {
    const router = useRouter()
    const { isAuthenticated, setLocalAuthentication } = useAuth()

    const [toast, setToast] = useState(null)
    const [registerVisibility, setRegisterVisibility] = useState(false)
    const [loginVisibility, setLoginVisibility] = useState(false)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const onLogin = async (e) => {
        e.preventDefault()

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

        const json = await res.json()
        const { error } = json

        if (error) {
            setToast(error.message)
        } else {
            setLocalAuthentication(true)
            router.replace('/')
            setToast('Successfully logged in.')
        }
    }

    const onRegister = async (e) => {
        e.preventDefault()

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
            setToast(error.message)
        } else {
            setLocalAuthentication(true)
            router.replace('/')
            setToast('Successfully logged in.')
        }
    }

    return (
        <div className="flex w-full flex-col">
            <div className="bg-neutral-100 dark:bg-neutral-900">
                <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-t-lg border border-gray-200 p-5 text-left text-xl text-black hover:bg-gray-100  dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
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
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
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
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                    placeholder="•••••••••"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="mb-4 w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-2.5 text-center font-medium text-neutral-100 transition duration-300 hover:bg-neutral-900 hover:text-neutral-100  dark:hover:bg-neutral-100 hover:dark:text-neutral-900"
                            >
                                Login
                            </button>
                            <Link href="/auth/forgot">
                                <a className="text-sm font-medium transition duration-300 hover:text-red-700 dark:text-gray-400">
                                    Forgot your password?
                                </a>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
            <div className="bg-neutral-100 dark:bg-neutral-900">
                <button
                    type="button"
                    className={`flex w-full items-center justify-between ${
                        !registerVisibility && 'rounded-b-lg'
                    } border border-gray-200 p-5 text-left text-xl text-black hover:bg-gray-100  dark:border-gray-700 dark:text-white dark:hover:bg-gray-700`}
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
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
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
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
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
                                        className="h-5 w-5 rounded border border-gray-300 bg-gray-50 accent-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 "
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
                <button className="block w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600  py-2 font-normal text-neutral-100 transition duration-300 hover:bg-neutral-100 hover:text-neutral-900 hover:dark:text-neutral-100">
                    Sign-in with Google
                </button>
            </a>
        </div>
    )
}
