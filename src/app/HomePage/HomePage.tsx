import React, { useState, useEffect } from "react";
import prisma from "../../lib/prisma";
import TricountForm from '../../components/TricountForm'; 

export default async function Home() {
    const feed = await prisma.tricount.findMany()
  return (
    <>
    <h1>Tricount's List</h1>
    <TricountForm />
    
      {feed.map((post) => (
        <div key={post.id}>
          <p>{post.id}. {post.name}</p>
        </div>
      ))}
    </>
  )
}

