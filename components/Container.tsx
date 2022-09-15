import { useRouter } from 'next/router'

import Footer from 'components/Footer'
import Helmet from 'components/Helmet'
import Header from 'components/Header'

import i18n from 'i18n.config'
import config from 'main.config'

export default function Container(props) {
    const { children, ...customMeta } = props

    const { locale = config['defaultLocale'] } = useRouter()

    const meta = {
        title: i18n.title[locale],
        description: i18n.meta.description[locale],
        image: 'https://og-image.vercel.app/**Hiva**.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg',
        type: 'website',
        ...customMeta,
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900">
            {meta && <Helmet meta={meta} />}
            <main
                id="skip"
                className="flex flex-col justify-center px-[2rem] md:px-[4rem] lg:px-[8rem] xl:px-[16rem] 2xl:px-[20rem] bg-gray-50 dark:bg-gray-900"
            >
                <Header />
                {children}
                <Footer />
            </main>
        </div>
    )
}
