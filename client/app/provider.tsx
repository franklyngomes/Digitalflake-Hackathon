"use client"
import React, { ReactNode } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <div className=''>
      <Header />
      <div className='flex h-screen'>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

export default Provider