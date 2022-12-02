import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

const isProduction = process.env.NODE_ENV === 'production'
const googleID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

const gtag = `https://www.googletagmanager.com/gtag/js?id=${googleID}`
const gscript = {
    __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleID}', {
                  page_path: window.location.pathname,
                });
              `,
}

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link href="/favicon.ico" rel="shortcut icon" />
                <meta content="#ffffff" name="theme-color" />
                <meta content="#ffffff" name="msapplication-TileColor" />
                {googleID && isProduction && (
                    <>
                        <Script src={gtag} async strategy="afterInteractive" />
                        <Script
                            dangerouslySetInnerHTML={gscript}
                            strategy="afterInteractive"
                        />
                    </>
                )}
                <Script
                    src="https://accounts.google.com/gsi/client"
                    async
                    defer
                    strategy="afterInteractive"
                />
            </Head>
            <body className="bg-white text-black dark:bg-black dark:text-white">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
