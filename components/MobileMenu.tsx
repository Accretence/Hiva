import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from 'styles/mobile-menu.module.css'

import i18n from 'i18n.config'

export default function MobileMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function toggleMenu() {
        if (isMenuOpen) {
            setIsMenuOpen(false)
            document.body.style.overflow = ''
        } else {
            setIsMenuOpen(true)
            document.body.style.overflow = 'hidden'
        }
    }

    useEffect(() => {
        return function cleanup() {
            document.body.style.overflow = ''
        }
    }, [])

    return (
        <>
            <button
                className={`${styles.burger} visible my-auto md:hidden`}
                aria-label="Toggle menu"
                type="button"
                onClick={toggleMenu}
            >
                <MenuIcon data-hide={isMenuOpen} />
                <CrossIcon data-hide={!isMenuOpen} />
            </button>
            {
                <ul
                    className={`
                        ${styles.menu} absolute flex flex-col bg-[#F0F0F0] dark:bg-[#0c0c0c]
                    `}
                >
                    {i18n.components.nav.mobile.map((link, index) => {
                        return (
                            <li
                                key={index}
                                className="border-b border-gray-300 text-lg font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100"
                                style={{
                                    transitionDelay: `${150 + index * 50}ms`,
                                }}
                            >
                                <Link href={link.value}>
                                    <a className="flex w-auto pb-4">
                                        {link.en}
                                    </a>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            }
        </>
    )
}

function MenuIcon(props: JSX.IntrinsicElements['svg']) {
    return (
        <svg
            className="absolute h-5 w-5 text-gray-900 dark:text-gray-100"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            {...props}
        >
            <path
                d="M2.5 7.5H17.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.5 12.5H17.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function CrossIcon(props: JSX.IntrinsicElements['svg']) {
    return (
        <svg
            className="absolute h-5 w-5 text-gray-900 dark:text-gray-100"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
            {...props}
        >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
        </svg>
    )
}
