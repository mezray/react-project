'use client'
import React, { useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import ButtonBack from "@/components/ButtonBack";
import "../../../style.css"
import { TokenContext } from "@/context/tokenContext";
import { ErrorContext } from "@/context/errorContext";

export default function LoginPage() {
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const { setToken } = useContext(TokenContext)
    const { errorMessage, setError } = useContext(ErrorContext)

    const submitData = async (e: React.SyntheticEvent, action: string) => {
        e.preventDefault()
        try {
            const body = { identifier, password, action }
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
                // If the login was not successful, display an error message
                console.error(data.message)
                setError(data.message)                
            }
        } catch (error) {
            console.error("error",error)
        }
    }

    return (
        <>
            <div className="login-page">
                <form>
                    <h3>Hello !</h3>
                    <input
                        autoFocus
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="email or name"
                        type="text"
                        value={identifier}
                    />
                    <input
                        autoFocus
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        type="password"
                        value={password}
                    />
                    <p style={{ color: `#${Math.floor(Math.random()*16777215).toString(16)}` }}>{errorMessage}</p>
                    <button type="button" onClick={(e) => submitData(e, 'Login')}>
                        Login
                    </button>
                </form>
                <ButtonBack />
            </div>
            
        </>
    )
}