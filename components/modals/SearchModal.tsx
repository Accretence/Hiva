import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

export default function SearchModal() {
    return (
        <>
            <form>
                <label className="sr-only text-sm font-medium text-gray-900 dark:text-gray-300">
                    Search
                </label>
                <div className="relative p-4">
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full rounded-lg border border-neutral-200 bg-gray-50 p-4 text-sm text-gray-900  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        placeholder="Search Products, Blogs..."
                        required
                    />
                    <button
                        type="submit"
                        className="absolute bottom-6 right-7 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium text-white"
                    >
                        <MagnifyingGlassIcon className="h-5 w-5" />
                    </button>
                </div>
            </form>
            <div role="status" className="max-w-sm animate-pulse px-4 pb-6">
                <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-600"></div>
                <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                <div className="mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-600"></div>
                <div className="mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-600"></div>
                <div className="h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-600"></div>
                <span className="sr-only">Loading...</span>
            </div>
        </>
    )
}
