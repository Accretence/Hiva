import Link from 'next/link'
import useSWR from 'swr'
import cn from 'classnames'

import fetcher from 'lib/fetcher'
import { Views } from 'lib/types'
import { Eye } from './Icons'

export default function BlogPostCard({ title, slug }) {
    const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher)
    const views = data?.total

    const gradient = () => {
        const gradients = [
            'from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]',
            'from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]',
            'from-[#D8B4FE] to-[#818CF8]',
        ]

        return gradients[Math.floor(Math.random() * (gradients.length - 0) + 0)]
    }

    return (
        <Link href={`/blog/${slug}`}>
            <a
                className={cn(
                    'transform hover:scale-[1.01] transition-all',
                    'rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1',
                    gradient()
                )}
            >
                <div className="flex flex-col justify-between h-full bg-white dark:bg-gray-900 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                        <h4 className="text-lg md:text-lg font-medium mb-6 sm:mb-10 w-full text-gray-900 dark:text-gray-100 tracking-tight">
                            {title}
                        </h4>
                    </div>
                    <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
                        <Eye />
                        <span className="ml-2 align-baseline capsize">
                            {views ? new Number(views).toLocaleString() : '–––'}
                        </span>
                    </div>
                </div>
            </a>
        </Link>
    )
}
