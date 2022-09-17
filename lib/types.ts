import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export type Post = {
    id: string
    content: MDXRemoteSerializeResult
    title: string
    date: string
    excerpt: string
    coverImage: string
    readingTime: string
    tweets: any[]
}

export enum Form {
    Initial,
    Loading,
    Success,
    Error,
}

export type FormState = {
    state: Form
    message?: string
}

export type Subscribers = {
    count: number
}

export type YouTube = {
    subscriberCount: number
    viewCount: number
}

export type GitHub = {
    stars: number
}
