import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Modal from './Modal'

const Header = () => {
  const [showModal, setShowModal] = React.useState(false)
  const cancel = () => {
    setShowModal(false)
  }
  const confirm = () => {

  }
  return (
    <>
      <div className='h-[70px] bg-primary flex justify-between items-center px-4 z-99'>
        <Link href={"/"}>
          <Image src={"/images/transparent-logo.png"} width={200} height={60} alt='Logo' />
        </Link>
        <div className='flex justify-content-center items-center gap-3'>
          <Image src={"/images/user.png"} width={30} height={30} alt='user' onClick={() => setShowModal(true)}/>
          <h5>User</h5>
        </div>
      </div>

      {/* Logout Modal */}
      {
        showModal && (
          <Modal cancel={cancel} confirm={confirm} title={"Logout"} desc={"Are you sure you want to log out?"}/>
        )
      }
    </>
  )
}

export default Header