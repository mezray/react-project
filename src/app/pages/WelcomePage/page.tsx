'use client'
import Link from 'next/link';
import "../../style.css"

export default function WelcomePage() {
  //TODO: Check login status 
  return (
    <div className="welcome-page">
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
    </div>
  )
}