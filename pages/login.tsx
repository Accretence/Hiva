import { useRef, useState } from 'react'
import Image from 'next/future/image'
import Link from 'next/link'

import BlogPostCard from '../components/BlogPostCard'
import VideoCard from '../components/VideoCard'

import prisma from 'lib/prisma'
import { Form, FormState, Subscribers } from 'lib/types'
import fetcher from 'lib/fetcher'
import { GoogleIcon, LoadingSpinner } from 'components/Icons'
import ErrorMessage from 'components/ErrorMessage'
import SuccessMessage from 'components/SuccessMessage'
import useSWR from 'swr'
import gradient from 'lib/gradient'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { getGoogleURL } from 'lib/google'

export default function Home() {
    const router = useRouter()

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                    <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-2 mb-2">
                        <Disclosure as="div">
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2">
                                        <span className="flex flex-col">
                                            <h3
                                                className="text-left text-lg text-gray-900
                                                dark:text-gray-200"
                                            >
                                                Login
                                            </h3>
                                            <small
                                                className="text-left text-gray-800
                                                dark:text-gray-300"
                                            >
                                                Login with Email/ Password
                                            </small>
                                        </span>
                                        <ChevronUpIcon
                                            className={`${
                                                open && 'rotate-180 transform'
                                            } h-5 w-5 text-gray-900 dark:text-gray-200`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 py-2">
                                        <form
                                            className="relative my-4"
                                            onSubmit={onLogin}
                                        >
                                            <input
                                                ref={emailRef}
                                                aria-label="Email"
                                                placeholder="Input Email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="form-input solid rounded w-full dark:bg-gray-900"
                                            />
                                            <input
                                                ref={passwordRef}
                                                aria-label="Password"
                                                placeholder="Input Password"
                                                type="password"
                                                autoComplete="password"
                                                required
                                                className="form-input solid rounded w-full mt-2 dark:bg-gray-900"
                                            />
                                            <button
                                                className="block w-full mt-2 px-4 py-2 font-normal bg-gray-900 dark:bg-gray-200 text-gray-200 dark:text-gray-800 rounded"
                                                type="submit"
                                            >
                                                {form.state === Form.Loading ? (
                                                    <LoadingSpinner />
                                                ) : (
                                                    'Register'
                                                )}
                                            </button>
                                        </form>
                                        {form.state === Form.Error ? (
                                            <ErrorMessage>
                                                {form.message}
                                            </ErrorMessage>
                                        ) : form.state === Form.Success ? (
                                            <SuccessMessage>
                                                {form.message}
                                            </SuccessMessage>
                                        ) : null}
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-2">
                        <Disclosure as="div">
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2">
                                        <span className="flex flex-col">
                                            <h3
                                                className="text-left text-lg text-gray-900
                                                dark:text-gray-200"
                                            >
                                                Register
                                            </h3>
                                            <small
                                                className="text-left text-gray-800
                                                dark:text-gray-300"
                                            >
                                                Register with Email/ Password
                                            </small>
                                        </span>
                                        <ChevronUpIcon
                                            className={`${
                                                open && 'rotate-180 transform'
                                            } h-5 w-5 text-gray-900 dark:text-gray-200`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 pt-4 pb-2">
                                        <form
                                            className="relative my-4"
                                            onSubmit={onRegister}
                                        >
                                            <input
                                                ref={emailRef}
                                                aria-label="Email"
                                                placeholder="Input Email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="form-input solid rounded w-full dark:bg-gray-900"
                                            />
                                            <input
                                                ref={passwordRef}
                                                aria-label="Password"
                                                placeholder="Input Password"
                                                type="password"
                                                autoComplete="password"
                                                required
                                                className="form-input solid rounded w-full mt-2 dark:bg-gray-900"
                                            />
                                            <button
                                                className="block w-full mt-2 px-4 py-2 font-normal bg-gray-900 dark:bg-gray-200 text-gray-200 dark:text-gray-800 rounded"
                                                type="submit"
                                            >
                                                {form.state === Form.Loading ? (
                                                    <LoadingSpinner />
                                                ) : (
                                                    'Register'
                                                )}
                                            </button>
                                        </form>
                                        {form.state === Form.Error ? (
                                            <ErrorMessage>
                                                {form.message}
                                            </ErrorMessage>
                                        ) : form.state === Form.Success ? (
                                            <SuccessMessage>
                                                {form.message}
                                            </SuccessMessage>
                                        ) : null}
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                    <div className={`mt-2 p-1 rounded-lg ${gradient()}`}>
                        <a href={getGoogleURL()}>
                            <button className="block w-full px-4 py-2 h-14 font-normal bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-md">
                                Sign-in with Google
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
