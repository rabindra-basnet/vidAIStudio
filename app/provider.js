"use client"
import React, { useContext, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { AuthContext } from '@/app/_context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/configs/firebaseConifgs'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

const Provider = ({ children }) => {

    const [user, setUser] = useState(null)
    const CreateUser = useMutation(api.users.CreateNewUSer)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            const result = await CreateUser({
                name: user?.displayName,
                email: user?.email,
                pictureURL: user?.photoURL

            })
            console.log("Convex user:", result);
            setUser(result)
        })
        return () => unsubscribe()
    }, [])
    return (
        <div>
            <AuthContext.Provider value={{ user }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    return ctx
}
export default Provider