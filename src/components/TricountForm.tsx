'use client'
import React, { useState, useContext } from "react";
import { TricountContext } from "@/context/tricount";
import { useRouter } from 'next/navigation'
import "../app/style.css"

export default function TricountForm() {
    const [title, setTitle] = useState('')
    const router = useRouter()
    const { feed, updateFeed } = useContext(TricountContext)

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
          const body = { title } 
          const token = localStorage.getItem('token')
      
          await fetch(`/api/Tricounts/Tricount/CreateNewTricount`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
          })
          await updateFeed()
      
          router.push('/pages/HomePage')
        } catch (error) {
          console.error(error)
        }
      }

    return (
      <div className="tricount-form">
            <div>
                <form onSubmit={submitData}>
                    <h4>Add a new Tricount</h4>
                    <input
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title of the tricount"
                        type="text"
                        value={title}
                    />
                    <input type="submit"
                        value="Add"
                    />
                </form>
            </div>
        </div>
    )
}
