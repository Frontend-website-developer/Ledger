import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import BalanceCard from "../components/BalanceCard";
import ExpenseList from "../components/ExpenseList";
import PaymentList from "../components/PaymentList";
import type { Profile, Balance, Payment, Expense } from "../Types";   
import PaymentSubmit from "./SubmitPaymentPage";
import { API_URL } from "../config";

function ClientDashboard() {



    const token = useSelector((state: RootState) => state.auth.token);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [balance, setBalance] = useState<Balance>({totalExpense: 0, totalPaid: 0, balance: 0});
    const [expense, setExpense] = useState<Expense[]>([]);
    const [payment, setPayment] = useState<Payment[]>([]);
    useEffect(
        () => {

            async function fetchBalance(){
                const response = await fetch(`${API_URL}/api/client/balance`, {
                    headers: {
                        Authorization: `Bearer ${token}` },
                    });
                    const data = await response.json();
                    setBalance(data);
                }
                async function fetchExpense(clientId: string){
                    const response = await fetch(`${API_URL}/api/expense/client/${clientId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                        const data = await response.json();
                        setExpense(data);
                }

                

                async function fetchProfile() {
                const response = await fetch(`${API_URL}/api/client/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setProfile(data);
            fetchExpense(data._id);
        }
            
            fetchProfile();
            fetchBalance();
            
            }, []);

 useEffect(
     () => {
         

                 fetchPayment();
     }, []
 );

        async function fetchPayment(){
                    const response = await fetch(`${API_URL}/api/payment/my`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                        const data = await response.json();
                        setPayment(data);
                }
    
    return (
        <>
        <div className="px-5">

        <h1>Welcome {profile?.name}</h1>
        <PaymentSubmit onPaymentSubmitted={fetchPayment} />
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



export default ClientDashboard;