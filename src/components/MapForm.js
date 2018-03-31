import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete'

let MapForm = (props) => {
  const {formSubmit, start, end, cssClasses } = props
  return (
    <form onSubmit={formSubmit.bind(this)} id="valueForm" className="maxW">
      <h3>Where do you want to go?</h3>
      <div>
        <label> Start</label>
        <PlacesAutocomplete
          inputProps={start}
          classNames={cssClasses}
        />
      </div>
      <div>
        <label>End</label>
        <PlacesAutocomplete
          inputProps={end}
          classNames={cssClasses}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default MapForm;
