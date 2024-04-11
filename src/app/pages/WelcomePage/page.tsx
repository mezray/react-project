'use client'
import Link from 'next/link';

export default function WelcomePage() {
  //TODO: Check login status 
  return (
    <>
      <h1>Welcome</h1>
      <div>
        Please Login or Register
      </div>
      <div>
        <Link href="/pages/Auth/Login">Login</Link>
      </div>
      <div>
        <Link href="/pages/Auth/Register">Register</Link>
      </div>
    </>
  )
}

