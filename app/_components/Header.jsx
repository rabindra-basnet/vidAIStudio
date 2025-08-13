import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
   <div className='p-4 flex items-center justify-between
   '>
    <div className='flex items-center gap-3'>
      <Image src={"/logo.png"}
      alt='logo'
      width={50}
      height={50} />
      <h2 className='text-2xl font-bold'>VidAi Studio</h2>
    </div>

     <div>
      <Button size={"lg"} variant={"orange"}>Get Started</Button>
     </div>
     </div>
  )
}

export default Header