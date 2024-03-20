import React, { useState, useEffect } from "react";
import prisma from "../../lib/prisma";
import TricountForm from '../../components/TricountForm';
import Link from 'next/link'; 
export default async function Home() {
    const feed = await prisma.tricount.findMany()
    return (
        <>
            <h1>Tricount's List</h1>
            <TricountForm />
            
            {feed.map((tricount) => (
                <div key={tricount.id}>
                    <Link href={`/tricount/${tricount.id}`}> 
                        {tricount.id}. {tricount.name} 
                    </Link>
                </div>
            ))}
        </>
    )
}