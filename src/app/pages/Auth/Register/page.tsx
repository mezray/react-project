"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import ButtonBack from "@/components/ButtonBack";
import { TokenContext } from "@/context/tokenContext";
import { ErrorContext } from "@/context/errorContext";
import "../../../style.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const { setToken } = useContext(TokenContext);
  const { errorMessage, setError } = useContext(ErrorContext);

  const submitData = async (e: React.SyntheticEvent, action: string) => {
    e.preventDefault();

    try {
      const body = { name, email, password, action };
      const response = await fetch(`/api/Auth/Register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (response.ok) {
        // If the registration was successful, store the token and redirect to /pages/HomePage
        localStorage.setItem("token", data.token);
        setToken(data.token);
        router.push("/pages/HomePage");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="register-page">
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
          <button type="button" onClick={(e) => submitData(e, "Register")}>
            Register
          </button>
        </form>
        <ButtonBack />
          <p style={{color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, }}>{errorMessage}</p>
          {errorMessage && <img src="/slap.gif"width="400" height="200"/>}
      </div>
    </>
  );
}
