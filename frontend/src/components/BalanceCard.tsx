type BalanceCardProps = {
    balance: number;
    totalExpense: number;
    totalPaid: number;
}

function BalanceCard({balance, totalExpense, totalPaid}: BalanceCardProps) {
    return (
        <div>
            <h3 className="text-[22px] font-semibold text-[#000] mb-2">Summary</h3>
            <div className="border border-gray-300 w-[100%] rounded-md">
        <table className="w-[100%] bg-[#fff]">
                    <thead className="text-left bg-[#f1f5f9]">
                <th className="p-2">Total Expense</th>
                <th className="p-2">Total Payment</th>
                <th className="p-2">Balance</th>
            </thead>
            <tr>
                <td className="border border-gray-300 p-2">{totalExpense}</td>
                <td className="border border-gray-300 p-2">{totalPaid}</td>
                <td className="border border-gray-300 p-2">{balance}</td>
            </tr>
        </table>
            </div>
        </div>
    )
}

export default BalanceCard;