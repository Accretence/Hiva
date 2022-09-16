import Link from 'next/link'
import useSWR from 'swr'

import fetcher from 'lib/fetcher'
import { Views } from 'lib/types'
import { EyeIcon } from '@heroicons/react/24/solid'
import gradient from 'lib/gradient'

export default function BlogPostCard({ title, slug }) {
    const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher)
    const views = data?.total

    return (
        <Link href={`/blog/${slug}`}>
            <a
                className={`transform hover:scale-[1.01] transition-all rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1 ${gradient(
                    { seed: slug }
                )}`}
            >
                <div className="flex flex-col justify-between h-full bg-white dark:bg-gray-900 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                        <h4 className="text-lg md:text-lg font-normal mb-6 sm:mb-10 w-full text-gray-900 dark:text-gray-100 tracking-tight">
                            {title}
                        </h4>
                    </div>
                    <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
                        <EyeIcon className="h-5 w-5" />
                        <span className="ml-2 align-baseline capsize">
                            {views ? new Number(views).toLocaleString() : '–––'}
                        </span>
                    </div>
                </div>
            </a>
        </Link>
    )
}
