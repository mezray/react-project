"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddCost from "@/components/AddCost";
import AddUserToTricount from "@/components/AddUserToTricount";
import { UserContextProvider } from "@/context/user";

function TricountPage({ params: { id } }) {
  const [tricounts, setTricounts] = useState(null);
  const [debts, setDebts] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchTricounts = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/Tricounts/Cost/FindAllCost/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      setTricounts(data);

      const newDebts = {};
      data.forEach((tricount) => {
        const amount = tricount.price / tricount.debtors.length;
        tricount.debtors.forEach((debtor) => {
          if (debtor.name !== tricount.payer.name) {
            newDebts[debtor.name] = newDebts[debtor.name] || {};
            newDebts[debtor.name][tricount.payer.name] =
              (newDebts[debtor.name][tricount.payer.name] || 0) + amount;
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
    };

    fetchTricounts();
  }, [id]);

  if (!tricounts) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Activité</th>
            <th>Prix</th>
            <th>Payer</th>
            <th>Debtors</th>
          </tr>
        </thead>
        <tbody>
          {tricounts.map((tricount) => (
            <tr key={tricount.id}>
              <td>{tricount.title}</td>
              <td>{tricount.price}€</td>
              <td>{tricount.payer.name}</td>
              <td>
                {tricount.debtors.map((debtor) => debtor.name).join(", ")}
              </td>
            </tr>
          ))}
          <tr>
            <td>Total:</td>
            <td>
              {tricounts.reduce((total, tricount) => total + tricount.price, 0)}
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
          {Object.entries(debts).map(([name, debtToOthers], index) => (
            <tr key={index}>
              <td>{name} owes:</td>
              {Object.entries(debtToOthers).map(([otherName, amount]) => (
                <td key={otherName}>
                  {otherName}: {amount.toFixed(2)}€
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <UserContextProvider>
        <div>
          <AddUserToTricount tricountId={id} />
        </div>
        <div>
          <AddCost tricountId={id} />
        </div>
      </UserContextProvider>
      <button type="button" onClick={() => router.back()}>
        Back
      </button>
    </>
  );
}

export default TricountPage;
