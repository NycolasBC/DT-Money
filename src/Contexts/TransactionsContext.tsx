import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../Lib/axios";

interface Transactions {
    ID: number,
    DESCRIPTION: string,
    TYPE: 'income' | 'outcome',
    CATEGORY: string,
    PRICE: number,
    CREATED_AT: string
}

interface TransactionsContextType {
    transactions: Transactions[];
    fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionsProviderProps {
    children: ReactNode;
}


export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transactions[]>([])

    async function fetchTransactions(query?: string) {
        const response = await api.get('/transactions', {
            params: {
                q: query
            }
        })

        setTransactions(response.data)
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    return (
        <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}