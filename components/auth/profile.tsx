'use client';

import { useAuth } from "../context/auth-context";

export default function Profile() {
    const { user } = useAuth();

    return (
        <div className="w-full min-h-screen items-center align-middle text-black">
            {user ? (
                <div className="flex flex-col items-center justify-center gap-4">
                    <h1 className="text-2xl font-bold">Profile</h1>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>  
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}