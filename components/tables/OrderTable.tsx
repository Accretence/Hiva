import Link from 'next/link'
import Table from './Table'

export default function OrderTable({ orders }) {
    console.log(orders)
    const headers = ['Order', 'Is Delivered', 'Total Price']

    return (
        <Table headers={headers}>
            {orders &&
                orders.map((order, index) => (
                    <tr
                        key={index}
                        className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                    >
                        <td className="py-4 px-6">
                            <Link href={`/order/${order.id}`}>
                                Order #${index}
                            </Link>
                        </td>
                        <td className="py-4 px-6">
                            {order.isDelivered ? 'False' : 'No'}
                        </td>
                        <td className="py-4 px-6">${order.payableAmount}</td>
                    </tr>
                ))}
        </Table>
    )
}
