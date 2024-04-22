'use client'
import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ErrorContext } from '@/context/errorContext';

export default function ButtonBack() {
    const { setError } = useContext(ErrorContext);

    const router = useRouter();
    return (
        <>
            <div>
            <button type="button" onClick={() => {setError(""); router.back();}} >
                Back
            </button>
            </div>
        </>
    )
}