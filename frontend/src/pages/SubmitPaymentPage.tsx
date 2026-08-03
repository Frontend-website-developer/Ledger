import { useState } from "react";
import { useSelector} from "react-redux";
import type { RootState } from "../store";
import { API_URL } from "../config";

type PaymentSubmitProps = {
    onPaymentSubmitted?: () => void;
}

function PaymentSubmit({onPaymentSubmitted}: PaymentSubmitProps) {

    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const token = useSelector((state: RootState) => state.auth.token);
    const role = useSelector((state: RootState) => state.auth.role);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await fetch(`${API_URL}/api/payment/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({amount: Number(amount), description})
        });
        onPaymentSubmitted?.();
    }

    return (
        <div className="">
        {role === "client" && (
            <>
        <h2 className="text-[22px]">Submit Payment</h2>
<div className="p-5 my-5 bg-[#fff] border border-[#e2e8f0] rounded-md">
        <form className="flex items-end" onSubmit={handleSubmit}>
            <div>
                <label className="block text-[14px] text-[#000]">Amount</label>
                <input required className="px-2 border border-[#e2e8f0] mr-2 text-[12px] rouded-md bg-[#f8fafc]" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount"/>
            </div>
            <div>
                <label className="block text-[14px] text-[#000]">Description</label>
                <input className="px-2 border border-[#e2e8f0] mr-2 text-[12px] rouded-md bg-[#f8fafc]" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            </div>
            <div>
                <button className="bg-[green] text-[#fff] px-2 text-[14px] inline-block rouded-md" type="submit">Submit Payment</button>
            </div>
        </form>
        </div>
        </>
        )
    }
        </div>
    )
}

export default PaymentSubmit;