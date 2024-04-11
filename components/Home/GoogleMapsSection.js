'use client'
import React, { useState, useEffect, useContext } from 'react';
import { DirectionsRenderer, GoogleMap, Marker, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';

const containerStyle = {
  width: '100%',
  height: '85vh'
};

function GoogleMapsSection() {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [directionRoutePoints, setDirectionRoutePoints] = useState([]);
  const [center, setCenter] = useState({
    lat: 39.9220,
    lng: 32.8515
  });

  useEffect(() => {
    if (source && source.lat && source.lng) {
      setCenter({
        lat: source.lat,
        lng: source.lng
      });
    }
    if (destination && destination.lat && destination.lng) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng
      });
    }
  }, [source, destination]);

  useEffect(() => {
    if (source && source.lat && source.lng && destination && destination.lat && destination.lng) {
      directionRoute();
    }
  }, [source, destination]);

  const [map, setMap] = useState(null);

  const directionRoute = () => {
    const DirectionsService = new window.google.maps.DirectionsService();
    DirectionsService.route({
      origin: { lat: source.lat, lng: source.lng },
      destination: { lat: destination.lat, lng: destination.lng },
      travelMode: window.google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirectionRoutePoints(result);
      } else {
        console.error('Error fetching directions:', status);
      }
    });
  };

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      options={{
        styles: 
        [
          {
              "featureType": "all",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#7c93a3"
                  },
                  {
                      "lightness": "-10"
                  }
              ]
          },
          {
              "featureType": "administrative.country",
              "elementType": "geometry",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "administrative.country",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#a0a4a5"
                  }
              ]
          },
          {
              "featureType": "administrative.province",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#62838e"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#dde3e3"
                  }
              ]
          },
          {
              "featureType": "landscape.man_made",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#3f4a51"
                  },
                  {
                      "weight": "0.30"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "poi.attraction",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "poi.business",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.government",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.park",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "poi.place_of_worship",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.school",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.sports_complex",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "all",
              "stylers": [
                  {
                      "saturation": "-100"
                  },
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#bbcacf"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "lightness": "0"
                  },
                  {
                      "color": "#bbcacf"
                  },
                  {
                      "weight": "0.50"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "labels.text",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#ffffff"
                  }
              ]
          },
          {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#a9b4b8"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "invert_lightness": true
                  },
                  {
                      "saturation": "-7"
                  },
                  {
                      "lightness": "3"
                  },
                  {
                      "gamma": "1.80"
                  },
                  {
                      "weight": "0.01"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#a3c7df"
                  }
              ]
          }
      ]
      }}
      
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {source && source.lat && source.lng && (
        <Marker
          position={{ lat: source.lat, lng: source.lng }}
          icon={{
            url: '/sourceNew.png',
            scaledSize: new window.google.maps.Size(50, 50),
            origin: new window.google.maps.Point(5, -15)
          }}
        >
          <OverlayView
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className='p-2'>
              <p className='text-black text-[18px]'>{source.label}</p>
            </div>
          </OverlayView>
        </Marker>
      )}
      {destination && destination.lat && destination.lng && (
        <Marker
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: '/dest.png',
            scaledSize: new window.google.maps.Size(50, 50),
            origin: new window.google.maps.Point(5, -15)
          }}
        >
          <OverlayView
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className='p-2'>
              <p className='text-black text-[18px]'>{destination.label}</p>
            </div>
          </OverlayView>
        </Marker>
      )}
      <DirectionsRenderer
        directions={directionRoutePoints}
        options={{
          polylineOptions: {
            strokeColor: '#000',
            strokeWeight: 4
          },
          suppressMarkers: true
        }}
      />
    </GoogleMap>
  );
}

export default GoogleMapsSection;
