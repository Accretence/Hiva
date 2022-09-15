import {
    SunIcon,
    MoonIcon,
    UserPlusIcon,
    UserIcon,
} from '@heroicons/react/24/solid'

import MobileMenu from 'components/MobileMenu'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from 'state/Auth'

export default function Header({ auth }) {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()
    const { isAuthenticated, setLocalAuthentication } = useAuth()
    // After mounting, we have access to the theme
    useEffect(() => setMounted(true), [])

    useEffect(() => {
        setLocalAuthentication(auth)
    }, [])

    function NavItem({ href, text }) {
        const router = useRouter()
        const isActive = router.asPath === href

        return (
            <Link href={href}>
                <a
                    className={`${
                        isActive
                            ? 'font-semibold text-gray-800 dark:text-gray-200'
                            : 'font-normal text-gray-600 dark:text-gray-400'
                    } hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all
                `}
                >
                    <span className="capsize">{text}</span>
                </a>
            </Link>
        )
    }

    return (
        <>
            <div className="flex flex-col justify-center">
                <nav className="flex items-center justify-between w-full relative border-gray-200 dark:border-gray-700 pt-4 text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
                    <a href="#skip" className="skip-nav">
                        Skip to content
                    </a>
                    <div>
                        <MobileMenu />
                        <NavItem href="/" text="Home" />
                        <NavItem href="/dashboard" text="Dashboard" />
                        <NavItem href="/blog" text="Blog" />
                        <NavItem href="/snippets" text="Snippets" />
                    </div>
                    <div className="flex">
                        <button
                            aria-label="Toggle Dark Mode"
                            type="button"
                            className="mx-2 w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
                            onClick={() =>
                                setTheme(
                                    resolvedTheme === 'dark' ? 'light' : 'dark'
                                )
                            }
                        >
                            {mounted &&
                                (resolvedTheme === 'dark' ? (
                                    <SunIcon className="h-5 w-5" />
                                ) : (
                                    <MoonIcon className="h-5 w-5" />
                                ))}
                        </button>
                        {isAuthenticated ? (
                            <Link href="/user">
                                <button
                                    aria-label="Authentication"
                                    type="button"
                                    className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
                                >
                                    {mounted && (
                                        <UserIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <button
                                    aria-label="Authentication"
                                    type="button"
                                    className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
                                >
                                    {mounted && (
                                        <UserPlusIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
            <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mt-4 mb-8" />
        </>
    )
}

export async function getServerSideProps(ctx) {
    const { AJWT } = ctx.req.cookies

    return {
        props: { auth: AJWT ? true : false },
    }
}
