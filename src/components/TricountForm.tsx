'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'


export default function TricountForm() {
    const [title, setTitle] = useState('')
    const router = useRouter()

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            const body = { title }
            await fetch(`/api/post`, {
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
                <form onSubmit={submitData}>
                    <h3>Add Tricount</h3>
                    <input
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Name"
                        type="text"
                        value={title}
                    />
                    <input type="submit"
                        value="Add"
                    />
                </form>
            </div>
        </>
    )
}

//TODO : Add useEffect to refresh page after adding a tricount
