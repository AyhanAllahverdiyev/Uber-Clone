'use client'
import React, { useContext,useEffect, useState } from 'react'
import Image from 'next/image'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';

function InputItem({type}) {
  const [value, setValue]=useState(null)
const [placeholder, setPlaceholder]=useState(type === 'source' ? 'Where are you?' : 'Where to?')
  const {source, setSource}=useContext(SourceContext)
  const {destination, setDestination}=useContext(DestinationContext)

   const getLatAndLng= (place, type)=>{
    const placeId=place.value.place_id
    const service=new google.maps.places.PlacesService(document.createElement('div'))
    service.getDetails({placeId},(place,status)=>{
      if(status==='OK' && place.geometry && place.geometry.location){
        const lat=place.geometry.location.lat()
        const lng=place.geometry.location.lng()
        if(type=='source'){
          setSource({
            lat,
            lng,
            name:place.formatted_address,
            label:place.name
          })
         }
         else{
          setDestination({
            lat,
            lng,
            name:place.formatted_address,
            label:place.name
          })
         }
       
      }
    })
    }


return (
    <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-0' style={{ width: '100%' }}>
      <Image src={type === 'source' ? '/source.png' : '/dest.png'} width={70} height={70}/>
    
        <GooglePlacesAutocomplete
          selectProps={{
            value,
            onChange: (place)=>{getLatAndLng(place, type); setValue(place)},
            placeholder: placeholder,
             isClearable: true,
            className:'w-full',
            components:{
              DropdownIndicator:false
            },
            styles: {
              control:(provided)=>({
                ...provided,
                backgroundColor:'transparent',
                border:'none'
              })
            }
          }}
          // apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        />
 
    </div>
  )
}

export default InputItem
