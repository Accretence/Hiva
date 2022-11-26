export default function Table({ children, headers }) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {headers &&
                            headers.map((header) => (
                                <th
                                    key={header}
                                    scope="col"
                                    className="py-3 px-6"
                                >
                                    {header}
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    )
}
