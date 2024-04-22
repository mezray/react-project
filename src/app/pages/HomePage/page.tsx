'use client'
import TricountForm from '../../../components/TricountForm';
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react'
import { TricountContext } from '@/context/tricount';
import "../../style.css"


export default function HomePage() {
  const { feed, updateFeed } = useContext(TricountContext)

  useEffect(() => {
    updateFeed()
  }, [])

  return (
    <div className="home-page">
      <h1>Your Tricount's List</h1>
      {feed.map((tricount) => (
        <Link href={`/pages/TricountListing/${tricount.id}`}>
          <div>{tricount.id}. {tricount.name}</div>
        </Link>
      ))}
      <TricountForm />
    </div>
  )
}
