'use client'
import TricountForm from '../../../components/TricountForm';
import Link from 'next/link';
import { useEffect, useState } from 'react'


export default function HomePage() {
  const [feed, setFeed] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      // Get the token from localStorage
      const token = localStorage.getItem('token')

      const res = await fetch('/api/tricountlist/', {
        headers: {
          // Include the token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",


      })
      const data = await res.json()
      console.log(data);
      setFeed(data)
    }

    fetchData()
  }, [])

  return (
    <>
      <h1>Tricount's List</h1>

      <TricountForm />
      {feed.map((tricount) => (
        <Link href={`/pages/tricount/${tricount.id}`}>
          <div>{tricount.id}. {tricount.name}</div>
        </Link>
      ))}

    </>
  )
}
