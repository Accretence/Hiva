export default function Table({ data, keys }) {
    console.log(data)
    console.log(keys)
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {keys &&
                            keys.map((key) => (
                                <th key={key} scope="col" className="py-3 px-6">
                                    {key}
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((row, index) => (
                            <tr
                                key={row}
                                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                            >
                                {keys &&
                                    keys.map((key) => {
                                        return (
                                            <td key={key} className="py-4 px-6">
                                                {row[key]}
                                            </td>
                                        )
                                    })}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}
