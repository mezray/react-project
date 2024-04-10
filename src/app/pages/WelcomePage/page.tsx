'use client'
import prisma from "../../../lib/prisma";
import TricountForm from '../../../components/TricountForm';
import Link from 'next/link'; 
import { useEffect, useState } from 'react';

export default function WelcomePage() {
  //TODO: Check login status 
  return (
    <>
        <h1>Welcome</h1>
        <div>
            Please Login or Register
        </div>
        <div> 
            <Link href="/pages/login">Login</Link>
            
        </div>
        <div> 
            <Link href="/pages/register">Register</Link>
        </div>
    </>
  )
}

