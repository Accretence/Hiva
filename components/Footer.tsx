import Link from 'next/link'
import { FacebookIcon, GithubIcon, InstagramIcon, TwitterIcon } from './Icons'

export default function Footer() {
    return (
        <footer>
            <hr className="border-1 my-10 w-full border-gray-200 dark:border-gray-800" />
            <div className="md:flex md:justify-between">
                <div className="mb-6 hidden md:mb-0 md:block">
                    <span className="flex flex-col">
                        <h2 className="whitespace-nowrap text-sm font-semibold uppercase text-black dark:text-white">
                            Hiva
                        </h2>
                        <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            © 2022 Hiva™ . All Rights Reserved.
                        </span>
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
                    <div>
                        <h2 className="mb-3 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                            Resources
                        </h2>
                        <ul className="text-gray-600 dark:text-gray-400">
                            <li className="mb-2 text-sm">
                                <Link href="/blog">
                                    <a className="">Blog</a>
                                </Link>
                            </li>
                            <li className="text-sm">
                                <Link href="/tutorials">
                                    <a className="transition duration-300 hover:text-red-700">
                                        Tutorials
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-3 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                            Follow us
                        </h2>
                        <ul className="text-gray-600 dark:text-gray-400">
                            <li className="mb-2 text-sm">
                                <a
                                    href="https://github.com/themesberg/flowbite"
                                    className=" "
                                >
                                    Github
                                </a>
                            </li>
                            <li className="text-sm">
                                <a
                                    href="https://discord.gg/4eeurUVvTy"
                                    className=""
                                >
                                    Discord
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-3 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                            Legal
                        </h2>
                        <ul className="text-gray-600 dark:text-gray-400">
                            <li className="mb-2 text-sm">
                                <a href="#" className="">
                                    Privacy Policy
                                </a>
                            </li>
                            <li className="text-sm">
                                <Link href="#">
                                    <a className="">Terms &amp; Conditions</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="mt-8 border-gray-200 dark:border-gray-800 sm:mx-auto" />
            <div className="my-8 flex justify-center space-x-6">
                <a
                    href="#"
                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                    <FacebookIcon />
                    <span className="sr-only">Facebook page</span>
                </a>
                <a
                    href="#"
                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                    <InstagramIcon />
                    <span className="sr-only">Instagram page</span>
                </a>
                <a
                    href="#"
                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                    <TwitterIcon />
                    <span className="sr-only">Twitter page</span>
                </a>
                <a
                    href="#"
                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                    <GithubIcon />
                    <span className="sr-only">GitHub account</span>
                </a>
            </div>
        </footer>
    )
}
