import Head from 'next/head'
import { useRouter } from 'next/router'

const baseName = 'Hiva'
const baseHandle = '@hiva'
const baseURL = 'https://hiva.vercel.app'

export default function Helmet({ meta }) {
    const router = useRouter()
    return (
        <Head>
            <title>{meta.title}</title>
            <meta name="robots" content="follow, index" />
            <meta content={meta.description} name="description" />
            <meta property="og:url" content={baseURL + router.asPath} />
            <link rel="canonical" href={baseURL + router.asPath} />
            <meta property="og:type" content={meta.type} />
            <meta property="og:site_name" content={meta.title} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:title" content={meta.title} />
            <meta property="og:image" content={meta.image} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={baseHandle} />
            <meta name="twitter:title" content={meta.title} />
            <meta name="twitter:description" content={meta.description} />
            <meta name="twitter:image" content={meta.image} />
            {meta.date && (
                <meta property="article:published_time" content={meta.date} />
            )}
        </Head>
    )
}
