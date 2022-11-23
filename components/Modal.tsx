export default function SearchDialog({
    children,
    header,
    title,
    modalVisibility,
    setModalVisibility,
}) {
    if (modalVisibility)
        return (
            <>
                <div
                    className="fixed top-0 left-0 z-10 h-full w-full bg-neutral-200/90 dark:bg-gray-900/90"
                    onClick={() => setModalVisibility(false)}
                />

                <div className="fixed top-1/2 left-1/2 z-20 mx-auto my-auto flex w-[80vw] max-w-2xl -translate-y-1/2 -translate-x-1/2 flex-col gap-2 rounded-xl bg-white  shadow-2xl  dark:bg-gray-700 md:w-1/2">
                    {header && (
                        <>
                            <button
                                type="button"
                                className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                                onClick={() => setModalVisibility(false)}
                            >
                                <svg
                                    aria-hidden="true"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="rounded-t border-b py-4 px-6 dark:border-gray-600">
                                <small className="text-lg font-normal text-gray-900 dark:text-neutral-300">
                                    {title}
                                </small>
                            </div>
                        </>
                    )}
                    {children}
                </div>
            </>
        )
}
