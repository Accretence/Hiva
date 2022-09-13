import { Html, Head, Main, NextScript } from 'next/document'

export default function Document(props) {
    return (
        <Html lang="en">
            <Head>
                <link href="/favicon.ico" rel="shortcut icon" />
                <meta content="#ffffff" name="theme-color" />
                <meta content="#ffffff" name="msapplication-TileColor" />
            </Head>
            <body className="bg-white dark:bg-black text-white dark:text-black">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
