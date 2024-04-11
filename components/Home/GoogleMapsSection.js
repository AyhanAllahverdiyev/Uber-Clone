import React,{useState,useEffect,useContext} from 'react'
import { DirectionsRenderer, GoogleMap, Marker, MarkerF, OverlayView, OverlayViewF, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';
const containerStyle = {
  width: '100%',
  height: window.innerWidth*0.52
};

function GoogleMapsSection() {
  const {source, setSource}=useContext(SourceContext);
  const {destination, setDestination}=useContext(DestinationContext);
  const [directionRoutePoints, setDirectionRoutePoints]=useState([]);
  const [center, setCenter] =useState( {
    lat: -3.745,
    lng: -38.523
  }); 
  useEffect(()=>{
    if(source?.length!=[] && map)
    { 
      map.panTo({lat:source.lat,lng:source.lng})
      setCenter({
        lat:source.lat,
        lng:source.lng
      
      })
    }
    if(destination?.length!=[] && source?.length!=[]){
      directionRoute()
    }
  },[source])
  useEffect(()=>{
    if(destination?.length!=[] && map){
      setCenter({
        lat:destination.lat,
        lng:destination.lng
      
      })
    }
    if(destination?.length!=[] && source?.length!=[]){
      directionRoute()
    }
  },[destination])
  const [map, setMap] = React.useState(null)

  const directionRoute= ()=>{
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route({
      origin: {lat:source.lat,lng:source.lng},
      destination:{lat:destination.lat,lng:destination.lng},
      travelMode:google.maps.TravelMode.DRIVING
    }, (result,status)=>{
        if(status===google.maps.DirectionsStatus.OK){
          setDirectionRoutePoints(result)
         }
         else{
          console.error('error')
         }
    })
  }



   const onLoad = React.useCallback(function callback(map) {
     const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds); 

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={1}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {source.length!=[]? <MarkerF
        position={{lat:source.lat, lng:source.lng}}
        icon={{
          url: '/sourceNew.png',
          scaledSize: new window.google.maps.Size(50,50)
        }}
        > 
        <OverlayViewF position={{lat:source.lat, lng:source.lng}}
            mapPaneName= {OverlayView.OVERLAY_MOUSE_TARGET}         
        >
          <div className='p-2'>
            <p className='text-black text-[18px]'>{source.label}</p>
          </div>
        </OverlayViewF>
         </MarkerF> : null}

         {destination.length!=[]? <MarkerF
        position={{lat:destination.lat, lng:destination.lng}}
        icon={{
          url: '/dest.png',
          scaledSize: new window.google.maps.Size(100,120)
        }}
        > 
        
        <OverlayViewF position={{lat:destination.lat, lng:destination.lng}}
            mapPaneName= {OverlayView.OVERLAY_MOUSE_TARGET}         
        >
          <div className='p-2'>
            <p className='text-black text-[18px]'>{destination.label}</p>
          </div>
        </OverlayViewF>

        </MarkerF>
        : null}
        <DirectionsRenderer
          directions={directionRoutePoints} 
          options={{
            polylineOptions:{
              strokeColor:'#000',
              strokeWeight:10
            },
            suppressMarkers:true,

          }}
        />
      </GoogleMap>
  ) 
}

export default GoogleMapsSection
