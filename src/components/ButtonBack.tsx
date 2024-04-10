'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import prisma from "../lib/prisma";
import Link from 'next/link';

export default function ButtonBack() {

    return (
        <>
            <div>
                <Link href="/"> Back to Menu</Link>
            </div>
        </>
    )
}