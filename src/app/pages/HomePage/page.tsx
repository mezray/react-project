'use client'
import TricountForm from '../../../components/TricountForm';
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react'
import { TricountContext } from '@/context/tricountContext';
import "../../style.css"

type tricount = {
  id: number,
  name: string
}
export default function HomePage() {
  const { feed, updateFeed } = useContext(TricountContext)

  useEffect(() => {
    updateFeed()
  }, [])

  return (
    <>
    <div className="home-page">
      <TricountForm />
      <h1>Your Tricount's List</h1>
      {feed.map((tricount: tricount) => (
        <Link href={`/pages/TricountListing/${tricount.id}`}>
          <div>{tricount.id}. {tricount.name}</div>
        </Link>
      ))}
    <img src="/cleaning.gif" /> 
      
    </div>
    </>
  )
}
