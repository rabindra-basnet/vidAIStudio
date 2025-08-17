"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import Auth from './FirebaseAuth'
import { ModeToggle } from '@/components/toggle-theme'
import Link from 'next/link'
import { signOut } from 'firebase/auth'
import { auth } from '@/configs/FirebaseConifgs'
import { useAuthContext } from '../provider'

const Header = () => {
  const { user } = useAuthContext()

  return (
    <div className='p-4 flex items-center justify-between
   '>
      <div className='flex items-center gap-3'>
        <Image src="/logo.png" alt="logo" width={50} height={50} className="w-auto h-auto" />
        <h2 className='text-2xl font-bold'>VidAi Studio</h2>
      </div>

      <div className="p-2 flex items-center justify-between gap-4">
        <ModeToggle />
        {!user ? (
          <Auth>
            <Button size="lg" variant="orange">Get Started</Button>
          </Auth>
        ) : (
          <div className="flex items-center gap-3">
            {/* <Link href="/dashboard"> */}
            <Button
              onClick={() => signOut(auth)}>
              LOGOUT
            </Button>
            {/* </Link> */}
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
        )}
      </div>

    </div>
  )
}

export default Header