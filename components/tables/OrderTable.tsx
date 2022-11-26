import Table from './Table'

export default function OrderTable({ orders }) {
    const keys = ['id', 'isDelivered', 'payableAmount']
    const headers = ['Order', 'Is Delivered', 'Total Price']

    return (
        <Table headers={headers}>
            {orders &&
                orders.map((order, index) => (
                    <tr
                        key={index}
                        className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                    >
                        {keys &&
                            keys.map((key) => {
                                return (
                                    <td key={key} className="py-4 px-6">
                                        {order[key]}
                                    </td>
                                )
                            })}
                    </tr>
                ))}
        </Table>
    )
}
