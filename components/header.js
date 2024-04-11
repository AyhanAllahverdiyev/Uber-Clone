import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
function Header() {
    const headerMenu=[
        {
            id:1,
            name:'Trip',
            icon:'/taxi.jpeg'
        },
        {
            id:2,
            name:'Package',
            icon:'/box.jpeg'
        }
    ]
  return (
    <div className='p-5 ml-5 pb-3 pl-10 border-b-[4px] border-gray-200 flex items-center justify-between'>
        <div className='flex gap-10 items-center'> 
      <Image src="/hero-image.png"
        width={90} height={90}
        alt='Logo'/>
        <div className='flex gap-6 items-center'>
             {headerMenu.map((item)=>(
                 <div className='flex gap-2 items-center' >
                <Image src={item.icon}
                width={20} height={20}
                alt='icon'/>
                <h2 className='text-[18px] font-medium'>{item.name}</h2>
            </div>
          ))}</div>
          </div>
          <UserButton/>
    </div>
  )
}

export default Header
