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
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { getGoogleURL } from 'lib/google'
import { useAuth } from 'state/Auth'
import { verifyJWT } from 'lib/jwt'
import { omitUser } from 'lib/omit'

export default function ({ auth }) {
    const router = useRouter()
    const { isAuthenticated, setLocalAuthentication } = useAuth()

    useEffect(() => {
        setLocalAuthentication(auth)
    }, [])

    const [form, setForm] = useState<FormState>({ state: Form.Initial })
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    return (
        <div className="flex flex-col ">
            <div className="border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 rounded-lg p-2 mb-2">
                <Disclosure as="div">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2">
                                <span className="flex flex-col">
                                    <h3
                                        className="text-left text-lg text-gray-900
                                                dark:text-gray-200"
                                    >
                                        User Info
                                    </h3>
                                    <small
                                        className="text-left text-gray-800
                                                dark:text-gray-300"
                                    >
                                        Your user information.
                                    </small>
                                </span>
                                <ChevronUpIcon
                                    className={`${
                                        open && 'rotate-180 transform'
                                    } h-5 w-5 text-gray-900 dark:text-gray-200`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 py-2"></Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
            <div className="border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 rounded-lg p-2">
                <Disclosure as="div">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2">
                                <span className="flex flex-col">
                                    <h3
                                        className="text-left text-lg text-gray-900
                                                dark:text-gray-200"
                                    >
                                        Orders
                                    </h3>
                                    <small
                                        className="text-left text-gray-800
                                                dark:text-gray-300"
                                    >
                                        List of your order history.
                                    </small>
                                </span>
                                <ChevronUpIcon
                                    className={`${
                                        open && 'rotate-180 transform'
                                    } h-5 w-5 text-gray-900 dark:text-gray-200`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2">
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
        </div>
    )
}

export async function getServerSideProps(ctx) {
    let decoded = null,
        user = null,
        omitted = null

    const { AJWT } = ctx.req.cookies

    if (AJWT) decoded = await verifyJWT(AJWT)

    if (decoded)
        user = await prisma.user.findUnique({
            where: {
                id: decoded.id.toString(),
            },
            include: {
                orders: true,
                cart: true,
                referralsProvided: true,
                googleIntegration: true,
            },
        })

    if (user) omitted = omitUser(user)
    return {
        props: { auth: AJWT ? true : false, omitted },
    }
}
