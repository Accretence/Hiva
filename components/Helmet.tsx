import Head from 'next/head'
import { useRouter } from 'next/router'

import i18n from 'i18n.config'
import config from 'main.config'

interface HelmetProps {
    title?: string
    description?: string
    image?: string
    type?: string
    date?: string
}

export default function Helmet({
    title,
    description,
    image,
    type,
    date,
}: HelmetProps) {
    const router = useRouter()
    const { locale = config['defaultLocale'] } = router
    const baseURL = process.env.NEXT_PUBLIC_URL

    title = title || i18n.title[locale]
    description = description || i18n.meta.description[locale]
    image = image || i18n.meta.image
    type = type || 'website'

    return (
        <Head>
            <title>{title}</title>
            <meta name="robots" content="follow, index" />
            <meta content={description} name="description" />
            <meta property="og:url" content={baseURL + router.asPath} />
            <link rel="canonical" href={baseURL + router.asPath} />
            <meta property="og:site_name" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="640" />
            <meta property="og:image:height" content="300" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta property="og:type" content={type} />
            {date && <meta property="article:published_time" content={date} />}
        </Head>
    )
}
