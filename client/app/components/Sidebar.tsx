import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const Sidebar = () => {
  const [activeTab, setActiveTab] = React.useState("");
  const pathname = usePathname();
  console.log(pathname)
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
  React.useEffect(() => {
    if(options.find((item) => item.link === pathname)){
      setActiveTab(pathname)
    }
  },[pathname])
  return (
    <div className='bg-[#F4F4F4] h-screen py-4'>
      <ul>
        {options.map((item, index) => (
          <li key={index} className={`mb-3 transition-all ease-in-out hover:bg-[#FFF8B7] ${activeTab === item.link ? "bg-[#FFF8B7]" : ""}`}>
            <Link href={item.link} className="flex justify-center md:justify-start items-center gap-4 p-3">
              <Image src={item.icon} width={20} height={20} alt="Icon" />
              <span className="text-black hidden md:block">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>


    </div>
  )
}

export default Sidebar