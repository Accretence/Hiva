import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link href="/favicon.ico" rel="shortcut icon" />
                <meta content="#ffffff" name="theme-color" />
                <meta content="#ffffff" name="msapplication-TileColor" />
            </Head>
            <body className="bg-white text-black dark:bg-black dark:text-white">
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
                    strategy="afterInteractive"
                />
                <Script
                    src="https://accounts.google.com/gsi/client"
                    async
                    defer
                    strategy="afterInteractive"
                />
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
