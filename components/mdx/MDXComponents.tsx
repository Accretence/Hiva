import Link from 'next/link'
import Image from 'next/image'

import ProsCard from 'components/mdx/ProsCard'
import ConsCard from 'components/mdx/ConsCard'
import Step from 'components/mdx/Step'

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

function Header({ title }) {
    return <>HEY</>
}

const MDXComponents = {
    Image: RoundedImage,
    Callout,
    ConsCard,
    ProsCard,
    Step,
    Header,
}

export default MDXComponents
