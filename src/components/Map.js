import React from 'react';
import GoogleMapReact from 'google-map-react';
import config from '../../config.json'

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

let MapArea = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${config.google.maps}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '60vh', width: '100%' }} />,
    containerElement: <div style={{ height: '60vh', width: '100%' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentWillUpdate(props) {
      const DirectionsService = new google.maps.DirectionsService();
      console.log(props.directions, 'props here');
      if(props.directions.status === "OK" && props.directions.routes[0].bounds.northeast) {
        const bounds = props.directions.routes[0].bounds
        DirectionsService.route({
          // origin: new google.maps.LatLng(bounds.northeast.lat, bounds.northeast.lng),
          // destination: new google.maps.LatLng(bounds.southwest.lat, bounds.southwest.lng),
          origin: props.start,
          destination: props.end,
          travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            props.updateDirections(result)
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
      }
    }
  })
)(props =>
  <div className="maxW">
    <GoogleMap
      defaultZoom={7}
      defaultCenter={props.center}
    >

      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>

  </div>
);

export default MapArea
