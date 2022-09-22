export default function SearchDialog({
    children,
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
                <div className="fixed top-1/2 left-1/2 z-20 mx-auto my-auto flex w-[80vw] max-w-2xl -translate-y-1/2 -translate-x-1/2 flex-col gap-2 rounded-xl bg-neutral-100 p-4 shadow-2xl dark:bg-neutral-900 md:w-1/2 md:p-8">
                    {children}
                </div>
            </>
        )
}
