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

// let MapArea = withScriptjs(withGoogleMap((props) =>
//   <GoogleMap
//     defaultZoom={12}
//     defaultCenter={props.center}
//
//   >
//     {props.directions && <DirectionsRenderer directions={props.directions} />}
//     {/* {<DirectionsRenderer directions={props.directions} />} */}
//   </GoogleMap>
// ))

let MapArea = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${config.google.maps}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '77vh', width: '50%' }} />,
    containerElement: <div style={{ height: '70vh', width: '50%' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      // const DirectionsService = new google.maps.DirectionsService();
      // new google.maps.Map(document.getElementById('map'), {
      //     center: {lat: -34.397, lng: 150.644},
      //     zoom: 8
      //   });

      // DirectionsService.route({
      //   origin: new google.maps.LatLng(41.8507300, -87.6512600),
      //   destination: new google.maps.LatLng(41.8525800, -87.6514100),
      //   travelMode: google.maps.TravelMode.DRIVING,
      // }, (result, status) => {
      //   if (status === google.maps.DirectionsStatus.OK) {
      //     this.setState({
      //       directions: result,
      //     });
      //     // console.log(this.state);
      //     console.log('UPDATING');
      //     console.log(this.state.directions.routes[0].bounds);
      //   } else {
      //     console.error(`error fetching directions ${result}`);
      //   }
      // });
    },
    componentWillUpdate(props) {
      const DirectionsService = new google.maps.DirectionsService();
      console.log(props.directions, 'props here');
      if(props.directions.status === "OK" && props.directions.routes[0].bounds.northeast) {
        const bounds = props.directions.routes[0].bounds
        console.log(bounds,'stately');
        console.log(props,'PROPERTIES');
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
            console.log(result);
            console.log(status);
            console.error(`error fetching directions ${result}`);
            // this.setState({error: 1})
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
      {console.log(props.directions,'directed here')}
      {console.log(props.center, 'centered again')}

      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>

    {/* <div id="map"></div> */}
  </div>
);
// = (props) => {
//   const demo = {
//     center: {
//       lat: 59.95,
//       lng: 30.33
//     },
//     zoom: 11
//   }
//   return (
//     <div style={{ height: '50vh', width: '50%' }} className="maxW">
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: config.google.maps }}
//           defaultCenter={demo.center}
//           defaultZoom={demo.zoom}
//         />
//       </div>
//   )
// }

// {props.error > 0 ?
//     <h2>
//       There was an error with the API. Please resubmit.
//     </h2> : <div></div>
//   }
export default MapArea
