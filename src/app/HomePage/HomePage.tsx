'use client'
import prisma from "../../lib/prisma";
import TricountForm from '../../components/TricountForm';
import Link from 'next/link'; 
import { useEffect, useState } from 'react'

export default function Home() {
  const [feed, setFeed] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/tricountlist')
      const data = await res.json()
      setFeed(data)
    }

    fetchData()
  }, [])
  return (
    <>
      <h1>Tricount's List</h1>
      <TricountForm />
      {feed.map((tricount) => (
        <div key={tricount.id}>
          <Link href={`/test/${tricount.id}`}>
            {tricount.id}. {tricount.name}
          </Link>
        </div>
      ))}
    </>
  )
}