import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete'
import roundTo from 'round-to'
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
  <div>
    {props.outputs && <div className="formButtons">
      <h4>Distance: {`${roundTo(props.outputs.distance / 1000,2)} kilometers`}</h4>
      <h4>Duration: {`${Math.ceil(props.outputs.time / 60)} minutes`}</h4>
    </div>}
    <form onSubmit={props.formSubmit.bind(this)} className="formButtons">
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
      <button disabled={props.isDisabled()} type="submit">Submit</button>
    </form>
    <div style={{marginTop: '2%'}} className="formButtons">
      {props.renderMapButton && <button onClick={props.directionButton}> Render Directions On Map</button>}
    </div>
  </div>
);


export default MapForm;
