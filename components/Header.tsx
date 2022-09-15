import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

import MobileMenu from 'components/MobileMenu'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

export default function Header() {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()

    // After mounting, we have access to the theme
    useEffect(() => setMounted(true), [])

    function NavItem({ href, text }) {
        const router = useRouter()
        const isActive = router.asPath === href

        return (
            <NextLink href={href}>
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
            </NextLink>
        )
    }

    return (
        <>
            <div className="flex flex-col justify-center">
                <nav className="flex items-center justify-between w-full relative border-gray-200 dark:border-gray-700 pt-4 text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
                    <a href="#skip" className="skip-nav">
                        Skip to content
                    </a>
                    <div className="ml-[-0.60rem]">
                        <MobileMenu />
                        <NavItem href="/" text="Home" />
                        <NavItem href="/dashboard" text="Dashboard" />
                        <NavItem href="/blog" text="Blog" />
                        <NavItem href="/snippets" text="Snippets" />
                    </div>
                    <button
                        aria-label="Toggle Dark Mode"
                        type="button"
                        className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
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
                </nav>
            </div>
            <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mt-4 mb-8" />
        </>
    )
}
