"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import AddCost from '@/components/AddCost';
import AddUserToTricount from '@/components/AddUserToTricount';

function TricountPage( { params: { id } } ) {
  const [tricounts, setTricounts] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTricounts = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/tricount/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTricounts(data);
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
          <td>{tricount.debtors.map(debtor => debtor.name).join(', ')}</td>
        </tr>
      ))}
      <tr>
        <td>Total:</td>
        <td>{tricounts.reduce((total, tricount) => total + tricount.price, 0)}€</td>
      </tr>
      {Object.entries(
        tricounts.reduce((acc, tricount) => {
          tricount.debtors.forEach((debtor) => {
            acc[debtor.name] = (acc[debtor.name] || 0) + tricount.price / tricount.debtors.length;
          });
          return acc;
        }, {})
      ).map(([name, debt], index) => (
        <tr key={index}>
          <td>{name} debt:</td>
          <td>{debt.toFixed(2)}€</td>
        </tr>
      ))}
    </tbody>
  </table>
  <div>
  <AddUserToTricount tricountId={id} />
</div>
  <div>
    <AddCost tricountId={id} />
  </div>
  <button type="button" onClick={() => router.back()}>Back</button>
</>
  );
}

export default TricountPage;