'use client'
import React, { useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import ButtonBack from "@/components/ButtonBack";
import "../../../style.css"
import { TokenContext } from "@/context/tokenContext";

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const { setToken } = useContext(TokenContext)

    const submitData = async (e: React.SyntheticEvent, action: string) => {
        e.preventDefault()
        try {
            const body = { email, password, action }
            const response = await fetch(`/api/Auth/Login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            const data = await response.json()

            if (response.ok) {
                // If the login was successful, store the token and redirect to /pages/HomePage
                localStorage.setItem('token', data.token)
                setToken(data.token)
                router.push('/pages/HomePage')
            } else {
                // If the login was not successful, redirect to /
                router.push('/')
                
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <div className="login-page">
                <form>
                    <h3>Hello !</h3>
                    <input
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                        type="text"
                        value={email}
                    />
                    <input
                        autoFocus
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        type="password"
                        value={password}
                    />
                    <button type="button" onClick={(e) => submitData(e, 'Login')}>
                        Login
                    </button>
                </form>
            </div>
            <ButtonBack />
        </>
    )
}