"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import AddTransaction from "@/components/AddTransaction";
import AddUserToTricount from "@/components/AddUserToTricount";
import { UserContextProvider } from "@/context/userContext";
import { TransactionContext } from "@/context/transactionContext";
import "../../../style.css";
import ButtonBack from "@/components/ButtonBack";
import PenguinButton from "@/components/PenguinButton";


function TricountPage({ params: { id } }: { params: { id: string } }) {
  const [tricounts, setTricounts] = useState(null);
  const [debts, setDebts] = useState({});
  const { Transactions, fetchTransactions, deleteTransaction } = useContext(TransactionContext);
  const router = useRouter();

  useEffect(() => {
    fetchTransactions(id);
  }, [id]);

  useEffect(() => {
    const newDebts: { [key: string]: { [key: string]: number } } = {};
    Transactions.forEach((transactions) => {
      const amount = transactions.price / transactions.debtors.length;
      transactions.debtors.forEach((debtor) => {
        if (debtor.name !== transactions.payer.name) {
          newDebts[debtor.name] = newDebts[debtor.name] || {};
          newDebts[debtor.name][transactions.payer.name] =
            (newDebts[debtor.name][transactions.payer.name] || 0) + amount;
        }
      });
    });

    // Offset debts
    for (const [name, debtToOthers] of Object.entries(newDebts)) {
      for (const [otherName, amount] of Object.entries(debtToOthers)) {
        if (newDebts[otherName] && newDebts[otherName][name]) {
          const minDebt = Math.min(amount, newDebts[otherName][name]);
          newDebts[name][otherName] -= minDebt;
          newDebts[otherName][name] -= minDebt;
        }
      }
    }

    setDebts(newDebts);
  }, [id, Transactions])

  return (
    <div className="tricount-page">
      <UserContextProvider>
        <div>
          <u><strong>Add a friend :</strong></u>
          <AddUserToTricount tricountId={id} />
        </div>
        <div>
        <u><strong>Add a new Transaction :</strong></u>
          <AddTransaction tricountId={id} />
        </div>
      </UserContextProvider>
      <table>
        <thead>
          <tr>
            <th>Activities</th>
            <th>Prices</th>
            <th>Payers</th>
            <th>Debtors</th>
          </tr>
        </thead>
        <tbody>
          {Transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td>{transaction.price}€</td>
              <td>{transaction.payer.name}</td>
              <td>
                {transaction.debtors.map((debtor) => debtor.name).join(", ")}
              </td>
              <td>
                <button onClick={() => deleteTransaction(transaction.id, id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr className="total-row">
            <td>Total:</td>
            <td>
              {Transactions.reduce((total, transaction) => total + transaction.price, 0)}
              €
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Net Debt</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(debts)
            .map(([name, debtToOthers]) => ({
              name,
              debtToOthers,
              netDebt: Object.values(debtToOthers).reduce((a: number, b) => a + b, 0),
            }))
            .filter(({ netDebt }) => netDebt !== 0)
            .map(({ name, debtToOthers }) => (
              <tr key={name}>
                <td>{name}  </td>
                {Object.entries(debtToOthers).map(([otherName, amount]) => (
                  <td key={otherName}>
                    owes to {otherName} a value of {amount.toFixed(2)}€
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      < ButtonBack />
    </div>
  );
}

export default TricountPage;
