import type { Expense } from "../Types";

type ExpenseListProps = {
    expenses: Expense[];
}

function ExpenseList({expenses}: ExpenseListProps){

    return(
        <div>
            <h3 className="text-[22px] font-semibold text-[#000] mb-2">Expense Breakdown</h3>
            <div className="border border-gray-300 w-[100%] rounded-md overflow-x-auto">
                <table className="w-full min-w-[400px]">
                    <thead className="text-left bg-[#f1f5f9]">
                        <tr>
                            <th className="p-2">Date</th>
                            <th className="p-2">Description</th>
                            <th className="p-2">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            expenses.map((expense) => (
                                <tr key={expense._id}>
                                    <td className="border border-gray-300 p-2">{new Date(expense.createdAt).toLocaleDateString()}</td>
                                    <td className="border border-gray-300 p-2">{expense.description}</td>
                                    <td className="border border-gray-300 p-2">{expense.amount}</td>
                                    
                                </tr>
                                
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ExpenseList;