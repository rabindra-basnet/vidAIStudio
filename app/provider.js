"use client"
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/app/_context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/configs/FirebaseConfigs'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'

const Provider = ({ children }) => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const CreateUser = useMutation(api.users.CreateNewUSer)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const result = await CreateUser({
                    name: user?.displayName,
                    email: user?.email,
                    pictureURL: user?.photoURL

                })
                console.log("Convex user:", result);
                setUser(result)

                // User logged in
                router.replace("/dashboard")
            }
            else {
                // User logged out
                setUser(null)
            }
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

export const useAuthContext = () => useContext(AuthContext)

export default Provider