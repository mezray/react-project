import prisma from "../lib/prisma";

export async function fetchAndUpdateTricounts() {
    const feed = await prisma.tricount.findMany();
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

    return feed;
}

export default fetchAndUpdateTricounts;