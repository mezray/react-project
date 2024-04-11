'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const router = useRouter()

    const submitData = async (e: React.SyntheticEvent, action: string) => {
        e.preventDefault()

        try {
            const body = { name, email, password, action }
            await fetch(`/api/Auth/Login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })

            router.push('/')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div>
                <form>
                    <h3>Hello !</h3>
                    <input
                        autoFocus
                        onChange={(e) => setName(e.target.value)}
                        placeholder="name"
                        type="text"
                        value={name}
                    />
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
                    <button type="button" onClick={(e) => submitData(e, 'Register')}>
                        Register
                    </button>
                </form>
            </div>
        </>
    )
}