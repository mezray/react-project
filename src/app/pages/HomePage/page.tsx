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

      const res = await fetch('/api/Tricounts/Tricount/TricountListing/', {
        headers: {
          // Include the token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      })

      const data = await res.json()
      setFeed(data)
    }

    fetchData()
  }, [])

  return (
    <>
      <h1>Your Tricount's List</h1>
      {feed.map((tricount) => (
        <Link href={`/pages/TricountListing/${tricount.id}`}>
          <div>{tricount.id}. {tricount.name}</div>
        </Link>
      ))}
      <TricountForm />
    </>
  )
}
