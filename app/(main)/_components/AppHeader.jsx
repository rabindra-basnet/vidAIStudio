"use client"
import { useAuthContext } from '@/app/provider'
import { ModeToggle } from '@/components/toggle-theme'
import { SidebarTrigger } from '@/components/ui/sidebar'
import Image from 'next/image'
import React from 'react'

const AppHeader = () => {
    const { user } = useAuthContext()
    return (
        <div className='p-3 flex justify-between items-center'>
            <SidebarTrigger />
            <div className='flex gap-3 items-center'>
                <ModeToggle />
                {user?.pictureURL ? (
                    <Image
                        src={user?.pictureURL}
                        alt="user image"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
                )}
            </div>
        </div>
    )
}

export default AppHeader