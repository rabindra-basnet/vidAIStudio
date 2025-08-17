"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import Auth from './FirebaseAuth'
import { useAuthContext } from '../provider'


const Hero = () => {
    const {user} = useAuthContext()
    if (user != null){
        console.log(user?.accessToken)
    }
    
    return (
        <div className='p-10 flex flex-col items-center justify-center
    mt-24 md:px-20 lg:px-36 xl:px-48'>
            <h2 className='font-bold text-6xl text-center'>Unleash Your Vision with AI Video</h2>
            <p className='mt-4 text-2xl text-center text-gray-500'>Transform text, images, and ideas into breathtaking videos in minutes. Fast, intuitive, and professional.</p>
            <div className="mt-7 flex items-center justify-center gap-3">
                <Auth>
                    <Button size="lg" variant={"orange"}>Get Started For Free</Button>
                </Auth>

                <Button size="lg">Watch Demo</Button>
            </div>
        </div>
    )
}

export default Hero