import Link from 'next/link'

export default function Sidebar({ docObject }) {
    return (
        <div className="no-scrollbar col-span-1 h-full w-full overflow-x-auto rounded-md bg-gray-100 p-6 dark:bg-gray-800  dark:text-gray-300 md:col-span-2">
            {Object.keys(docObject).map((category) => (
                <div key={category}>
                    <p className="text-sm font-bold text-gray-400">
                        {category.toUpperCase()}
                    </p>
                    <ul className="my-3 ml-3">
                        {docObject[category].map((page) => (
                            <li className="mb-2" key={page.title}>
                                <Link
                                    href={page.route}
                                    className="whitespace-nowrap rounded-md py-2 px-4 text-gray-800 hover:bg-gray-900 dark:text-gray-200"
                                >
                                    {page.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}
