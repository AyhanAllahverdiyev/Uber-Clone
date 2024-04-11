'use client'
import React, {useState} from 'react'
import {CarListData} from '../../utils/CarListData'
import CarListItem from './CarListItem'
import { useRouter } from 'next/navigation'


const CarListOptions = ({distance}) => {
    
    const[activeIndex, setActiveIndex]=useState()
    const [selectedCar, setSelectedCar]=useState()  
    const router=useRouter();

  return (
    <div className='mt-5 overflow-auto h-[250px]'>
        <h2 className='text-[22px] font-bold'> Recommended</h2>


            {CarListData.map((item,index)=>(
                    <div key={item.id} className={`cursor-pointer p-2 px-4 rounded-md ${activeIndex===index?'border-[2px] border-black': null}`}
                    
                    onClick={()=>{setActiveIndex(index);
                                    setSelectedCar(item)}}>   
                        
                        <CarListItem car={item}distance={distance} />
                    </div>
            ))}



           {selectedCar?.name? <div className='flex justify-between fixed bottom-5 bg-white p-3 shadow-xl w-full md:w-[30%] border-[1px] items-center'>
                <h2> Make Payment for</h2>
                <button onClick={()=>router.push('/payment?amount='+(selectedCar.amount*distance).toFixed(2))} className='p-3 bg-black text-white rounded-lg text-center'> Request{selectedCar.name}</button>
            </div> :  null}
     </div>
  )
}

export default CarListOptions
