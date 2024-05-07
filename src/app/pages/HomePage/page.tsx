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

  const [isHovered, setIsHovered] = useState(false);

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
      <img 
        src="/cleaning.gif" 
        width={250} 
        height={175} 
        style={{ filter: isHovered ? 'none' : 'blur(50px)' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      /> 
    </div>
    </>
  )
}
