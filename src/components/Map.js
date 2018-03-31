import React from 'react';
import GoogleMapReact from 'google-map-react';
import config from '../../config.json'

let MapArea = (props) => {
  const demo = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }
  return (
    <div style={{ height: '50vh', width: '50%' }} className="maxW">
        <GoogleMapReact
          bootstrapURLKeys={{ key: config.google.maps }}
          defaultCenter={demo.center}
          defaultZoom={demo.zoom}
        />
      </div>
  )
}

export default MapArea
