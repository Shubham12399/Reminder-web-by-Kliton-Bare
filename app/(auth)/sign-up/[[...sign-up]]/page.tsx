import { SignUp } from '@clerk/nextjs'
import React from 'react'

export default async function page() {
    return (
        <div className="flex justify-center items-center h-[100dvh]">
            <SignUp></SignUp>
        </div>
    )
}
