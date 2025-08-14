import React from 'react'
import DashboardProvider from './provider'

const DashboardLayout = ({ children }) => {
    return (
        <div className='w-full'>
            <DashboardProvider>
              <div className=" mx-10">
                {children}
              </div>  
            </DashboardProvider>
        </div>
    )
}

export default DashboardLayout