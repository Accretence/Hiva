import Link from 'next/link'
import useSWR from 'swr'

import fetcher from 'lib/fetcher'
import { EyeIcon } from '@heroicons/react/24/solid'
import gradient from 'lib/gradient'

export default function BlogPostCard({ title, id }) {
    return (
        <Link href={`/blog/${id}`}>
            <a
                className={`w-full transform rounded-xl bg-gradient-to-r p-1 transition-all hover:scale-[1.01] md:w-1/3 ${gradient(
                    { seed: id }
                )}`}
            >
                <div className="flex h-full flex-col justify-between rounded-lg  bg-[#F0F0F0] p-4 dark:bg-[#0c0c0c]">
                    <div className="flex flex-col justify-between md:flex-row">
                        <h4 className="mb-6 w-full text-lg font-normal tracking-tight text-gray-900 dark:text-gray-100 sm:mb-10 md:text-lg">
                            {title}
                        </h4>
                    </div>
                </div>
            </a>
        </Link>
    )
}
