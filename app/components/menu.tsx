"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function MainPage() {
  const [tricounts, setTricounts] = useState<{ name: string }[]>([]);
  const handleAddTricount = (event) => {
    event.preventDefault();
    const name = prompt("Please enter a name for the new tricount");
    if (name) {
      setTricounts([...tricounts, { name }]);
    }
  };
  return (
    <>
      <div id="sidebar">
        <h1>Tricount's List</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search Tricounts"
              placeholder="Search"
              type="search"
              name="q"
            />
          </form>
          <form method="post" onSubmit={handleAddTricount}>
            <button type="submit">New</button>
          </form>
        </div>

        {tricounts.map((tricount, index) => (
          <Link href={`/tricounts`}></Link>
        ))}
      </div>
    </>
  );
}
