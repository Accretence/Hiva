import Link from 'next/link'
import Image from 'next/future/image'

export default function FunctionCard({
    title,
    description,
    id,
    logo,
    ...rest
}) {
    return (
        <Link href={`/snippets/${id}`}>
            <a
                className="border-grey-200 w-full rounded border bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
                {...rest}
            >
                <Image
                    alt={title}
                    height={32}
                    width={32}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png"
                    className="rounded-full"
                />
                <h3 className="mt-2 text-left text-lg font-bold text-gray-900 dark:text-gray-100">
                    {title}
                </h3>
                <p className="mt-1 text-gray-700 dark:text-gray-400">
                    {description}
                </p>
            </a>
        </Link>
    )
}
