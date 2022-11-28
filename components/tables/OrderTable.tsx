import Link from 'next/link'
import Table from './Table'
import { parseISO, format } from 'date-fns'

export default function OrderTable({ orders }) {
    console.log(orders)
    const headers = [
        'Order',
        'ID',
        'Is Paid ?',
        'Payment ID',
        'Referral Code',
        'Is Delivered ?',
        'Created At',
        'Total Price',
    ]

    return (
        <Table headers={headers}>
            {orders &&
                orders.map((order, index) => (
                    <tr
                        key={index}
                        className="border-b bg-transparent hover:bg-gray-50 dark:border-gray-700  dark:hover:bg-gray-600"
                    >
                        <td className="py-4 px-6 font-semibold text-black hover:text-pink-600 dark:text-white">
                            <Link href={`/user/order/${order.id}`}>
                                Order #{index} ◥
                            </Link>
                        </td>
                        <td className="py-4 px-6">{order.id}</td>
                        <td className="py-4 px-6">
                            {order.isPaid ? 'False' : 'No'}
                        </td>
                        <td className="py-4 px-6">
                            {order.paymentId || '---'}
                        </td>
                        <td className="py-4 px-6">
                            {order.referralCode || '---'}
                        </td>
                        <td className="py-4 px-6">
                            {order.isDelivered ? 'False' : 'No'}
                        </td>
                        <td className="py-4 px-6">
                            {format(parseISO(order.createdAt), 'MMMM dd, yyyy')}
                        </td>
                        <td className="py-4 px-16">${order.payableAmount}</td>
                    </tr>
                ))}
        </Table>
    )
}
