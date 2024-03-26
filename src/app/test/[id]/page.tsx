async function getData( id: string  ) {
  console.log("id",id)
  const res = await fetch(`http://localhost:3000/api/tricount/${id}`); // replace '1' with the actual id
  const data = await res.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default async function Page({params}: {params: {id: string}}) {
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
            <th>Tricount ID</th>
            <th>Payer ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.price}€</td>
              <td>{item.tricountId}</td>
              <td>{item.payerId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
