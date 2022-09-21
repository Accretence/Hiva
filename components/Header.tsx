import {
    SunIcon,
    MoonIcon,
    UserPlusIcon,
    UserIcon,
    UserMinusIcon,
    LanguageIcon,
    ShoppingCartIcon,
    MagnifyingGlassIcon,
    Bars3Icon,
} from '@heroicons/react/24/solid'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from 'state/Auth'
import Drawer from 'components/Drawer'
import SearchDialog from './SearchDialog'

export default function Header() {
    const [mounted, setMounted] = useState(false)
    const [showDrawer, setShowDrawer] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()
    const { isAuthenticated, setLocalAuthentication } = useAuth()

    // After mounting, we have access to the theme
    useEffect(() => setMounted(true), [])

    const [searchDialogVisible, setSearchDialogVisibility] = useState(false)

    // Toggle the menu when ⌘K is pressed
    useEffect(() => {
        const down = (e) => {
            if (e.key === 'k' && e.metaKey) {
                setSearchDialogVisibility(!searchDialogVisible)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

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
                    } ${
                        href == '/' ? 'inline-block' : 'hidden'
                    } rounded-lg p-1 transition-all hover:bg-gray-200 dark:hover:bg-gray-800 sm:px-3 sm:py-2 md:inline-block
                `}
                >
                    <span className="capsize">{text}</span>
                </a>
            </Link>
        )
    }

    return (
        <>
            <SearchDialog
                searchDialogVisible={searchDialogVisible}
                setSearchDialogVisibility={setSearchDialogVisibility}
            />

            <div className="flex flex-col justify-center">
                <nav className="relative flex w-full items-center justify-between border-gray-200 bg-opacity-60 pt-4 text-gray-900 dark:border-gray-700 dark:text-gray-100">
                    <div className="flex">
                        <button
                            onClick={() => setSearchDialogVisibility(true)}
                            aria-label="Search Button"
                            type="button"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200 ring-gray-300  transition-all hover:ring-2  dark:bg-gray-700"
                        >
                            <MagnifyingGlassIcon className="h-5 w-5" />
                        </button>
                        <button
                            aria-label="Toggle Dark Mode"
                            type="button"
                            className="ml-2 hidden h-9 w-9 items-center justify-center rounded-lg bg-gray-200 ring-gray-300 transition-all hover:ring-2 dark:bg-gray-700 md:flex"
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
                        <Drawer
                            setShowDrawer={setShowDrawer}
                            showDrawer={showDrawer}
                        />
                        <NavItem href="/" text="Hiva" />
                        <NavItem href="/dashboard" text="Dashboard" />
                        <NavItem href="/blog" text="Blog" />
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
                                                className="mx-2 hidden h-9 w-9 items-center justify-center rounded-lg bg-gray-200 ring-gray-300 transition-all hover:ring-2 dark:bg-gray-700 md:flex"
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
                                                className="hidden h-9 w-9 items-center justify-center rounded-lg bg-gray-200 ring-gray-300 transition-all hover:ring-2 dark:bg-gray-700 md:flex"
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
                                            className="hidden h-9 w-9 items-center justify-center rounded-lg bg-gray-200 ring-gray-300 transition-all hover:ring-2 dark:bg-gray-700 sm:flex"
                                        >
                                            <UserPlusIcon className="h-5 w-5" />
                                        </button>
                                    </a>
                                </Link>
                            )}
                            <button
                                aria-label="Authentication"
                                type="button"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200 ring-gray-300 transition-all hover:ring-2 dark:bg-gray-700 sm:hidden"
                                onClick={() => setShowDrawer(true)}
                            >
                                <Bars3Icon className="h-5 w-5 " />
                            </button>
                        </div>
                    )}
                </nav>
            </div>
            <hr className="border-1 mt-4 mb-8 w-full border-gray-200 dark:border-gray-800" />
        </>
    )
}
