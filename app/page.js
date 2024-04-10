'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import SearchSection from "../components/Home/SearchSection";
import GoogleMapsSection from "../components/Home/GoogleMapsSection";
import {SourceContext} from '../context/SourceContext';
import {DestinationContext} from '../context/DestinationContext';


  export default function Home() {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  return (
    <SourceContext.Provider value={{source,setSource}}> 
        <DestinationContext.Provider value={{destination,setDestination}}>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div> 
            <SearchSection/> 
          </div>
          <div className="col-span-2">
            <GoogleMapsSection/>
            </div>
        </div>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
