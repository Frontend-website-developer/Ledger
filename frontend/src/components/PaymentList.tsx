import type { Payment } from "../Types";

type PaymentListProps = {
    payments: Payment[];
}

function PaymentList({payments}: PaymentListProps)
{
    return(
        <div>
        <h3 className="text-[22px] font-semibold text-[#000] mb-2">Payment Breakdown</h3>
            <div className="border border-gray-300 w-[100%] rounded-md">
                <table className="w-[100%] bg-[#fff]">
                    <thead className="text-left bg-[#f1f5f9]">
                        <tr>
                        <th className="p-2">Date</th>
                        <th className="p-2">Description</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Amount</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                    {
                        payments.map((payment) => (
                            <tr key={payment._id}>
                                <td className="border border-gray-300 p-2">{new Date(payment.createdAt).toLocaleDateString()}</td>
                                <td className="border border-gray-300 p-2">{payment.description}</td>
                                <td className="border border-gray-300 p-2">{payment.status}</td>
                                <td className="border border-gray-300 p-2">{payment.amount}</td>
                                
                                
                                                

                            </tr>
                            
                        ))
                    }
                    </tbody>
                </table>
            </div>    
        </div>
    )
}

export default PaymentList;