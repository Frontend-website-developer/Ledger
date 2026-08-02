export type Profile = {
        _id: string;
        name: string;
        email: string;
    }
export type Balance = {
        totalExpense: number;
        totalPaid: number;
        balance: number;
    }
export type Expense = {
        _id: string;
        description: string;
        amount: number;
        
    }
export type Payment = {
        _id: string;
        description: string;
        amount: number;
        status: string;
        createdAt: string;
    }

export type Client = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    country?: string;
    city?: string;
    address?: string;
    postalCode?: string;
}

export type PendingPayment = Payment & {
    client: {_id: string; name: string};
}