import { useEffect, useState } from "react";
import { Header } from "../../Components/Header";
import { Summary } from "../../Components/Summary";
import { SearchForm } from "./Components/SearchForm";
import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";

interface TransactionsProps {
    ID: number,
    DESCRIPTION: string,
    TYPE: 'income' | 'outcome',
    CATEGORY: string,
    PRICE: number,
    CREATED_AT: string
}

export function Transactions() {
    const [transactions, setTransactions] = useState<TransactionsProps[]>([])

    async function loadTransactions() {
        const response = await fetch('http://localhost:3000/transactions')
        const data = await response.json()

        setTransactions(data)
        console.log("data: ", transactions)
    }

    useEffect(() => {
        loadTransactions()
    }, [])

    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />

                <TransactionsTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                                <tr key={transaction.ID}>
                                    <td width='50%'>{transaction.DESCRIPTION}</td>
                                    <td>
                                        <PriceHighLight variant={transaction.TYPE}>
                                            {transaction.PRICE}
                                        </PriceHighLight>
                                    </td>
                                    <td>{transaction.CATEGORY}</td>
                                    <td>{transaction.CREATED_AT}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}