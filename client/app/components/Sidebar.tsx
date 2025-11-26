import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  const options = [
    {
      title: "Home",
      link: '/',
      icon: "/images/home.png",
    },
    {
      title: "Category",
      link: "/category",
      icon: "/images/category.png",
    },
    {
      title: "Sub Category",
      link: "/sub-category",
      icon: "/images/subcategory.png",
    },
    {
      title: "Products",
      link: "/product",
      icon: "/images/products.png",
    },
  ]
  return (
    <div className='w-[20%] bg-[#F4F4F4] border h-[calc(100vh-70px)]'>
      <ul>
        {options.map((item, index) => (
          <li key={index} className="mb-3">
            <Link href={item.link} className="flex items-center gap-2">
              <Image src={item.icon} width={20} height={20} alt="Icon" />
              <span className="text-black">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>


    </div>
  )
}

export default Sidebar