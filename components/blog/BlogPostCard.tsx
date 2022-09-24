import Image from 'next/image'
import Link from 'next/link'

export default function BlogPostCard({ post }) {
    const { title, description, image, id } = post

    return (
        <Link href={`/blog/${id}`}>
            <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
                <a href="#">
                    <div className="relative h-64 w-96">
                        <Image
                            className="rounded-t-lg"
                            src={image}
                            alt="Blog Post Cover"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {title}
                        </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {description}
                    </p>
                </div>
            </div>
        </Link>
    )
}
