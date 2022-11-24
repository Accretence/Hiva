import Link from 'next/link'
import Image from 'next/image'

import ProsCard from 'components/blog/ProsCard'
import ConsCard from 'components/blog/ConsCard'
import Step from 'components/blog/Step'

const CustomLink = (props) => {
    const href = props.href
    const isInternalLink =
        href && (href.startsWith('/') || href.startsWith('#'))

    if (isInternalLink) {
        return (
            <Link {...props} href={href}>
                {props.children}
            </Link>
        )
    }

    return <a target="_blank" rel="noreferrer" {...props} />
}

function RoundedImage(props) {
    return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function Callout(props) {
    return (
        <div className="my-8 flex rounded-lg bg-gray-200 p-4 dark:bg-gray-800">
            <div className="mr-4 flex w-4 items-center">{props.emoji}</div>
            <div className="callout w-full">{props.children}</div>
        </div>
    )
}

const MDXComponents = {
    Image: RoundedImage,
    a: CustomLink,
    Callout,
    ConsCard,
    ProsCard,
    Step,
}

export default MDXComponents
