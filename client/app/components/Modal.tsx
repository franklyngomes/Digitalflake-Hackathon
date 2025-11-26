import React from 'react';
import Image from 'next/image';

const Modal = ({ cancel, confirm, title, desc }: { cancel: () => void, confirm: () => void, title: string, desc: string }) => {
  return (
    <div className='fixed inset-0 bg-black/40 flex justify-center items-center transition-all ease-in-out duration-100'>
      <div className='flex max-w-xl w-full flex-col justify-center items-center rounded-lg py-[50px] bg-white'>
        <div className='flex justify-content-center items-start gap-3'>
          <Image src={"/images/warning.png"} width={40} height={40} alt='user' />
          <h2 className='text-heading text-black mb-3 font-semibold'>{title}</h2>
        </div>
        <p className='text-body text-gray mb-8'>{desc}</p>
        <div className='flex gap-5'>
          <button className='rounded-full border border-gray text-gray font-semibold px-8 py-2 cursor-pointer hover:border-primary hover:text-primary' onClick={cancel}>Cancel</button>
          <button className="rounded-full bg-primary px-8 py-2 cursor-pointer font-semibold">Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default Modal