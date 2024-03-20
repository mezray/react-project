import prisma from "../../lib/prisma";
import TricountForm from '../../components/TricountForm';
import Link from 'next/link'; 


export default async function Home() {
    const feed = await prisma.tricount.findMany()
    for (const tricount of feed) {
      const costs = await prisma.cost.findMany({
        where: {
          tricountId: tricount.id,
        },
        select: {
          price: true,
        },
      });

      const total = costs.reduce((sum, cost) => sum + cost.price, 0);
      await prisma.tricount.update({
        where: { id: tricount.id },
        data: { total: total },
      });
    }

    return (
        <>            
        <h1>Tricount's List</h1>
            <TricountForm />
            {feed.map((tricount) => (
                <div key={tricount.id}>
                    <Link href={`/api/tricount/${tricount.id}`}> 
                        {tricount.id}. {tricount.name} 
                    </Link>
                </div>
            ))}
        </>
    )
}