import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { PendingPayment } from "../Types";
import { API_URL } from "../config";

function PendingPayments() {
    const [payment, setPayment] = useState<PendingPayment[]>([]);
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(
        () => {
            async function fetchPendingPayment() {
                const response = await fetch(`${API_URL}/api/payment/pending`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }

                })
                const data = await response.json();
                setPayment(data);
            }
            fetchPendingPayment();
        }, []
    )

    async function updateStatus(id: string, status: string) {
    await fetch(`${API_URL}/api/payment/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
    });
    setPayment(payment.filter((p) => p._id !== id));
}


    return (
        <div className="px-5">
            <h1>Pending Payments</h1>
            {
            payment.length > 0 ? (
                <div className="border border-gray-300 w-[100%] rounded-md">
                    <table className="w-[100%] bg-[#fff] text-[14px]">
                        <thead className="text-left bg-[#f1f5f9]">
                    <tr>
                        <th className="p-2">Date</th>
                        <th>Name</th>
                        <th className="p-2">Description</th>
                        <th className="p-2">Amount</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Action</th>
                    </tr>
                </thead>
            <tbody>
            {payment.map((pay) => {
                
                return(
                    
                    <tr key={pay._id}>
                        <td className="border border-gray-300 p-2">{new Date(pay.createdAt).toLocaleDateString()}</td>
                        <td className="border border-gray-300 p-2">{pay.client.name}</td>
                        <td className="border border-gray-300 p-2">{pay.description}</td>
                        <td className="border border-gray-300 p-2">{pay.amount}</td>
                        <td className="border border-gray-300 p-2">{pay.status}</td>
                        <td className="border border-gray-300 p-2"><button onClick={() => updateStatus(pay._id, "approved")} className="bg-green-500 rounded-md mr-2 text-[#fff] px-3">Approve</button> <button onClick={() => updateStatus(pay._id, "rejected")} className="bg-red-500 rounded-md text-[#fff] px-3">Reject</button></td>
                    </tr>
                
                )
            })}
            </tbody>
            </table>
            </div>
            ) : (
            
                <h2>No Pending Payment Found</h2>
            )
        }
        </div>
    )
}

export default PendingPayments;