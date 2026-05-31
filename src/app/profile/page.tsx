"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = React.useState('nothing');
    const logout = async() => {
        try {
            await axios.get('/api/users/logout');
            router.push('/login');
        } catch(error: unknown) {
            const message = error instanceof Error ? error.message : 'Internal server error';
            console.log(message);
        }
    }

    const getUserDetails = async() => {
        const response = await axios.get('/api/users/me');
        console.log(response.data);
        setData(response.data.data._id);
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2>{data === 'nothing' ? 'Nothing' : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4">Logout</button>
            <button onClick={getUserDetails} className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4">Get USer Details</button>
        </div>
    )
}