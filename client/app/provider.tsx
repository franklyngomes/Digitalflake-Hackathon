"use client"
import React, { ReactNode } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <div className=''>
      <Header />
      <div className='flex h-screen'>
        <div className='max-w-[15%] w-full'>
          <Sidebar />
        </div>
        <div className='max-w-[85%] w-full'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Provider