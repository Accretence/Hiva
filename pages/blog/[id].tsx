import BlogLayout from 'layouts/blog'
import Tweet from 'components/blog/Tweet'

import { Post } from 'lib/types'
import prisma from 'lib/prisma'
import { NextSeo } from 'next-seo'

export default function BlogPost() {
    return (
        <>
            <NextSeo title="Blog" description="Description" />
            Hello!
        </>
    )
}
