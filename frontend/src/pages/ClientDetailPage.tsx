import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { Balance, Client, Expense, Payment } from "../Types";
import BalanceCard from "../components/BalanceCard";
import PaymentList from "../components/PaymentList";
import ExpenseList from "../components/ExpenseList";
import Modal from "../components/Modal";
import { API_URL } from "../config";

function ClientSingle() {
    const token = useSelector((state: RootState) => state.auth.token);
    const { clientId } = useParams();

    const [clientProfile, setClientProfile] = useState<Client | null>(null);
    const [balance, setBalance] = useState<Balance>({ totalExpense: 0, totalPaid: 0, balance: 0 });
    const [expense, setExpense] = useState<Expense[]>([]);
    const [payment, setPayment] = useState<Payment[]>([]);
    const [showExpenseModal, setshowExpenseModal] = useState(false);
    const [showPaymentModal, setshowPaymentModal] = useState(false);

    const [expenseAmount, setExpenseAmount] = useState("");
    const [expenseDescription, setExpenseDescription] = useState("");
    const [paymentAmount, setPaymentAmount] = useState("");
    const [paymentDescription, setPaymentDescription] = useState("");

    async function fetchClientProfile() {
        const response = await fetch(`${API_URL}/api/client/${clientId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setClientProfile(data);
    }

    async function fetchClientBalance() {
        const response = await fetch(`${API_URL}/api/client/${clientId}/balance`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setBalance(data);
    }

    async function fetchClientExpenses() {
        const response = await fetch(`${API_URL}/api/expense/client/${clientId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setExpense(data);
    }

    async function fetchClientPayments() {
        const response = await fetch(`${API_URL}/api/payment/client/${clientId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setPayment(data);
    }

    useEffect(() => {
        fetchClientProfile();
        fetchClientBalance();
        fetchClientExpenses();
        fetchClientPayments();
    }, [clientId]);

    async function handleAddExpense(e: React.FormEvent) {
        e.preventDefault();
        await fetch(`${API_URL}/api/expense/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ amount: Number(expenseAmount), description: expenseDescription, client: clientId })
        });
        setExpenseAmount("");
        setExpenseDescription("");
        setshowExpenseModal(false);
        fetchClientExpenses();
        fetchClientBalance();
    }

    async function handleAddPayment(e: React.FormEvent) {
        e.preventDefault();
        await fetch(`${API_URL}/api/payment/admin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ amount: Number(paymentAmount), description: paymentDescription, client: clientId })
        });
        setPaymentAmount("");
        setPaymentDescription("");
        setshowPaymentModal(false);
        fetchClientPayments();
        fetchClientBalance();
    }

    return (
        <>
        

        <Modal isOpen={showExpenseModal} onClose={() => setshowExpenseModal(false)}>
            <h3 className="">Add Expense</h3>
            <form onSubmit={handleAddExpense}>
                <input className="border rounded-sm p-2 block my-2" required value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} placeholder="Amount" />
                <input className="border rounded-sm p-2 block my-2" value={expenseDescription} onChange={(e) => setExpenseDescription(e.target.value)} placeholder="Description" />
                <button className="bg-red-500 text-[#fff] text-[14px] px-2 rounded-sm" type="submit">Add Expense</button>
            </form>
        </Modal>

        <Modal isOpen={showPaymentModal} onClose={() => setshowPaymentModal(false)}>
            <h3>Add Payment</h3>
            <form onSubmit={handleAddPayment}>
                <input required value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} placeholder="Amount" />
                <input value={paymentDescription} onChange={(e) => setPaymentDescription(e.target.value)} placeholder="Description" />
                <button type="submit">Add Payment</button>
            </form>
        </Modal>

        <div className="px-5">
            <div className="flex justify-between items-center">
                <div className="">
                    <h1>{clientProfile?.name}</h1>
                </div>
                <div className="">
                    <button className="bg-red-500 text-[#fff] px-2 text-[12px] rounded-sm mr-[10px]" onClick={() => setshowExpenseModal(true)}>Add Expense</button>
                    <button className="bg-green-500 text-[#fff] px-2 text-[12px] rounded-sm" onClick={() => setshowPaymentModal(true)}>Add Payment</button>
                </div>
            </div>
            <div>
                <div className="text-[14px] my-4">
                    <PaymentList payments={payment} />
                </div>
                <div className="text-[14px] my-4">
                    <ExpenseList expenses={expense} />
                </div>
                <div className="text-[14px] my-4">
                    <BalanceCard
                        balance={balance.balance}
                        totalExpense={balance.totalExpense}
                        totalPaid={balance.totalPaid} />
                </div>
            </div>
        </div>
        </>
    )
}

export default ClientSingle;
