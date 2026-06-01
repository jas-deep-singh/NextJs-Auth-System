/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import axios from 'axios';
import Link from 'next/link';
import React from 'react';

export default function verifyEmailPage() {
    const [token, setToken] = React.useState("");
    const [verified, setVerified] = React.useState(false);
    const [error, setError] = React.useState(false);
    
    const verifyUserEmail = async() => {
        try {
            await axios.post('/api/users/verifyemail', {token});
            setVerified(true);
        } catch(error: unknown) {
            setError(true);
            if (axios.isAxiosError(error) && error.response) {
                console.log(error.response.data);
            } else {
                console.log(error);
            }
        }
    }

    React.useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || "");
    }, []);

    React.useEffect(() => {
        if(token.length>0) {
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className='flex flex-col items-center judtify-center min-h-screen py-2'>
            <h1 className='text-4xl'>Verify Email</h1>
            <h2 className='p-2 bg-orange-500 text-black'>{token ? `${token}` : 'No Token'}</h2>
            {verified && (
                <div>
                    <h2 className='text-2xl'>Email Verified</h2>
                    <Link href='/login'>
                        Login
                    </Link>
                </div>
            )}

            {error && (
                <div>
                    <h2 className='text-2xl bg-red-500 text-black'>Error</h2>
                </div>
            )}
        </div>
    )
}