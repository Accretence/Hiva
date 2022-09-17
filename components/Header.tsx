import {
    SunIcon,
    MoonIcon,
    UserPlusIcon,
    UserIcon,
    UserMinusIcon,
    LanguageIcon,
    ShoppingCartIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/solid'

import MobileMenu from 'components/MobileMenu'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from 'state/Auth'

export default function Header() {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()
    const { isAuthenticated, setLocalAuthentication } = useAuth()
    // After mounting, we have access to the theme
    useEffect(() => setMounted(true), [])

    function NavItem({ href, text }) {
        const router = useRouter()
        const isActive = router.asPath === href || href == '/'

        return (
            <Link href={href}>
                <a
                    className={`${
                        isActive
                            ? 'font-semibold text-gray-800 dark:text-gray-200'
                            : 'font-normal text-gray-600 dark:text-gray-400'
                    } hidden rounded-lg p-1 transition-all hover:bg-gray-200 dark:hover:bg-gray-800 sm:px-3 sm:py-2 md:inline-block
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
                <nav className="relative flex w-full items-center justify-between border-gray-200 bg-opacity-60 pt-4 text-gray-900 dark:border-gray-700 dark:text-gray-100">
                    <div className="flex">
                        <button
                            aria-label="Search Button"
                            type="button"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200 ring-gray-300  transition-all hover:ring-2  dark:bg-gray-700"
                        >
                            <MagnifyingGlassIcon className="h-5 w-5" />
                        </button>
                        <button
                            aria-label="Toggle Dark Mode"
                            type="button"
                            className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200 ring-gray-300  transition-all hover:ring-2  dark:bg-gray-700"
                            onClick={() =>
                                setTheme(
                                    resolvedTheme === 'dark' ? 'light' : 'dark'
                                )
                            }
                        >
                            {resolvedTheme === 'dark' ? (
                                <SunIcon className="h-5 w-5" />
                            ) : (
                                <MoonIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    <div>
                        <MobileMenu />
                        <NavItem href="/" text="Hiva" />
                        <NavItem href="/dashboard" text="Dashboard" />
                        <NavItem href="/blog" text="Blog" />
                        <NavItem href="/snippets" text="Snippets" />
                    </div>
                    {mounted && (
                        <div className="flex">
                            {isAuthenticated ? (
                                <>
                                    <Link href="/cart">
                                        <a>
                                            <button
                                                aria-label="Shopping Cart"
                                                type="button"
                                                className="mx-2 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200 ring-gray-300  transition-all hover:ring-2  dark:bg-gray-700"
                                            >
                                                <ShoppingCartIcon className="h-5 w-5" />
                                            </button>
                                        </a>
                                    </Link>
                                    <Link href="/user">
                                        <a>
                                            <button
                                                aria-label="Authentication"
                                                type="button"
                                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200 ring-gray-300  transition-all hover:ring-2  dark:bg-gray-700"
                                            >
                                                <UserIcon className="h-5 w-5" />
                                            </button>
                                        </a>
                                    </Link>
                                </>
                            ) : (
                                <Link href="/login">
                                    <a>
                                        <button
                                            aria-label="Authentication"
                                            type="button"
                                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200 ring-gray-300  transition-all hover:ring-2  dark:bg-gray-700"
                                        >
                                            <UserPlusIcon className="h-5 w-5" />
                                        </button>
                                    </a>
                                </Link>
                            )}
                        </div>
                    )}
                </nav>
            </div>
            <hr className="border-1 mt-4 mb-8 w-full border-gray-200 dark:border-gray-800" />
        </>
    )
}
