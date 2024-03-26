async function getData(id: string) {
  console.log("id", id);
  const res = await fetch(`http://localhost:3000/api/tricount/${id}`); // replace '1' with the actual id
  const data = await res.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const {
    props: { data },
  } = await getData(id);
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
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.price}€</td>
              <td>{item.payer.name}</td>
              <td>{item.debtors.map((debtor) => debtor.name).join(", ")}</td>
            </tr>
          ))}
          Total: {data.reduce((total, item) => total + item.price, 0)}€
          {Object.entries(
            data.reduce((acc, item) => {
              item.debtors.forEach((debtor) => {
                acc[debtor.name] =
                  (acc[debtor.name] || 0) + item.price / item.debtors.length;
              });
              return acc;
            }, {})
          ).map(([name, debt], index) => (
            <tr key={index}>
              <td>{name} debt: </td>
              <td>{debt.toFixed(2)}€</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
