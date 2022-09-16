import Image from 'next/future/image'

import Container from 'components/Container'
import type { PropsWithChildren } from 'react'
import { Snippet } from 'lib/types'

export default function SnippetLayout({
    children,
    snippet,
}: PropsWithChildren<{ snippet: Snippet }>) {
    return (
        <Container
            title={`${snippet.title} - Code Snippet`}
            description="A collection of code snippets – including serverless functions, Node.js scripts, and CSS tricks."
        >
            <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
                <div className="flex justify-between w-full mb-8">
                    <div>
                        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
                            {snippet.title}
                        </h1>
                        <p className="text-gray-700 dark:text-gray-300">
                            {snippet.description}
                        </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <Image
                            alt={snippet.title}
                            height={48}
                            width={48}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png"
                            className="rounded-full"
                        />
                    </div>
                </div>
                <div className="w-full">{children}</div>
            </article>
        </Container>
    )
}
