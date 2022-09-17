import Link from 'next/link'
import useSWR from 'swr'

import fetcher from 'lib/fetcher'
import { Views } from 'lib/types'

export default function BlogPost({
    id,
    title,
    excerpt,
}: {
    id: string
    title: string
    excerpt: string
}) {
    const { data } = useSWR<Views>(`/api/views/${id}`, fetcher)
    const views = data?.total

    return (
        <Link href={`/blog/${id}`}>
            <a className="w-full">
                <div className="mb-8 w-full">
                    <div className="flex flex-col justify-between md:flex-row">
                        <h4 className="mb-2 w-full text-lg font-normal text-gray-900 dark:text-gray-100 md:text-xl">
                            {title}
                        </h4>
                        <p className="mb-4 w-32 text-left text-gray-500 md:mb-0 md:text-right">
                            {`${
                                views
                                    ? new Number(views).toLocaleString()
                                    : '–––'
                            } views`}
                        </p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                        {excerpt}
                    </p>
                </div>
            </a>
        </Link>
    )
}
