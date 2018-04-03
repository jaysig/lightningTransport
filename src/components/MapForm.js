import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete'
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap
} = require("react-google-maps");
import config from '../../config.json'

let MapForm = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${config.google.maps}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div />,
    containerElement: <div />,
    mapElement: <div />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
  })
)(props =>
  <form onSubmit={props.formSubmit.bind(this)} id="valueForm">
    <h3>Where do you want to go?</h3>
    <div>
      <label> Start</label>
      <PlacesAutocomplete
        inputProps={props.start}
        classNames={props.cssClasses}
      />
    </div>
    <div>
      <label>End</label>
      <PlacesAutocomplete
        inputProps={props.end}
        classNames={props.cssClasses}
      />
    </div>
    <button type="submit">Submit</button>
  </form>
);



// (props) => {
//   const {formSubmit, start, end, cssClasses } = props
//   return (
//     <form onSubmit={formSubmit.bind(this)} id="valueForm">
//       <h3>Where do you want to go?</h3>
//       <div>
//         <label> Start</label>
//         <PlacesAutocomplete
//           inputProps={start}
//           classNames={cssClasses}
//         />
//       </div>
//       <div>
//         <label>End</label>
//         <PlacesAutocomplete
//           inputProps={end}
//           classNames={cssClasses}
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   )
// }

export default MapForm;
