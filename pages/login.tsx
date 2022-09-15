import { useRef, useState } from 'react'
import Image from 'next/future/image'
import Link from 'next/link'

import BlogPostCard from '../components/BlogPostCard'
import VideoCard from '../components/VideoCard'

import prisma from 'lib/prisma'
import { Form, FormState, Subscribers } from 'lib/types'
import fetcher from 'lib/fetcher'
import { LoadingSpinner } from 'components/Icons'
import ErrorMessage from 'components/ErrorMessage'
import SuccessMessage from 'components/SuccessMessage'
import useSWR from 'swr'
import gradient from 'lib/gradient'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'

export default function Home() {
    const router = useRouter()

    const [form, setForm] = useState<FormState>({ state: Form.Initial })
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const register = async (e) => {
        e.preventDefault()
        setForm({ state: Form.Loading })

        const email = emailRef.current.value
        const password = passwordRef.current.value
        const res = await fetch(`/api/auth/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                email,
                password,
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
        <div className="flex flex-col border-gray-200 dark:border-gray-700 pb-16">
            <div className="flex flex-col justify-between h-full border-gray-600 bg-white dark:bg-gray-800 rounded-lg p-2">
                <Disclosure as="div">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-lg font-medium text-gray-200">
                                <span>Register</span>
                                <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-gray-200`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2">
                                <form
                                    className="relative my-4"
                                    onSubmit={register}
                                >
                                    <input
                                        ref={emailRef}
                                        aria-label="Email"
                                        placeholder="Input Email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="px-4 py-2 mt-2 border-gray-600 focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                    />
                                    <input
                                        ref={passwordRef}
                                        aria-label="Password"
                                        placeholder="Input Password"
                                        type="password"
                                        autoComplete="password"
                                        required
                                        className="px-4 py-2 mt-2 border-gray-600 focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                    />
                                    <button
                                        className="block w-full mt-2 px-4 py-2 font-medium bg-gray-900 dark:bg-gray-200 text-gray-200 dark:text-gray-800 rounded"
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
                                    <ErrorMessage>{form.message}</ErrorMessage>
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
            <div className="flex flex-col justify-between h-full bg-white dark:bg-gray-800 rounded-lg p-4 mt-2"></div>
        </div>
    )
}
