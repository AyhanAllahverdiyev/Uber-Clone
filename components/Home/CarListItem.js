import React from 'react'
import Image from 'next/image'
import { HiUser } from 'react-icons/hi2'


const CarListItem = ({car, distance}) => {
  return (
    <div>
        <div className='flex items-center justify-between mt-5 '>
            <div className='flex items-center gap-5'> 
            <Image src={car.img}
            height={100}
            width={100}
            alt='car'  />
            <div>
                <h2 className='font-semibold text-[18px] flex gap-3 items-center'>
                    {car.name}
                   
                    <span className='flex gap-2 font-normal items-center text-[14px]' > 
                        <HiUser/>  {car.seat}
                    </span>
                    </h2>
                   <p>{car.desc}</p> 
            </div>
            <h2 className='text-[18px] font-semibold'> ${(car.amount*distance ).toFixed(2)}</h2>
        </div>
        </div>
    </div>
  )
}

export default CarListItem
 