import React, { Component} from 'react';
import MapForm from './MapForm'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'


class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      start: 'San Francisco, CA',
      end: ''
    }
    this.changeStart = (start) => this.setState({ start })
    this.changeEnd = (end) => this.setState({ end })
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    console.log(this.state)

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }
  render() {
    let start = {
      value: this.state.start,
      onChange: this.changeStart,
    }
    let end = {
      value: this.state.end,
      onChange: this.changeEnd,
    }
    return(
      <div>
        <h3>Hello</h3>
        {/* <Map /> */}
        <MapForm
          formSubmit={this.handleFormSubmit}
          start={start}
          end={end}
        />
      </div>
    )
  }
}

export default MapContainer
