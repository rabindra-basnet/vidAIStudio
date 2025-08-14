import React from 'react'
import Header from './_components/Header'
import Hero from './_components/Hero'

const page = () => {
  return (
    <div className='md:px-16 lg:px-24 xl:px-36'>
      {/* Header */}
      <Header />
      <Hero />

    </div>
  )
}

export default page