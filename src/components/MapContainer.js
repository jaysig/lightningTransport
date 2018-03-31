import React, { Component} from 'react';
import MapForm from './MapForm'
import { connect } from 'react-redux';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { newRoute } from '../actions';


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
    let startCords = {}
    let endCords = {}

    geocodeByAddress(this.state.start)
      .then((results) => {
        let geo = results[0].geometry.location
        return getLatLng(results[0])
      })
      .then(({lat, lng}) => {
        console.log('Success', lat, lng)
        startCords = {
          lat,
          lng
        }
      })
      .catch(error => console.error('Error at the Start', error))

    geocodeByAddress(this.state.end)
      .then((results) => {
        let geo = results[0].geometry.location
        return getLatLng(results[0])
      })
      .then(({lat, lng}) => {
        endCords = {
          lat,
          lng
        }
        let cords = {
          startCords,
          endCords
        }
        this.props.dispatch(newRoute(cords))
        console.log('End', startCords, endCords);
      })
      .catch(error => console.error('Error in the End', error))
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
    const cssClasses = {
      root: 'ray', //Styles the
      input: 'roy',
      autocompleteContainer: 'places',
      autocompleteItem: 'ron', //Colors the drop down items
      //autocompleteItemActive: 'rob', //This doesn't appear linked to anything
    }
    return(
      <div>
        <h3>Hello</h3>
        {/* <Map /> */}
        <MapForm
          formSubmit={this.handleFormSubmit}
          start={start}
          end={end}
          cssClasses={cssClasses}
        />
      </div>
    )
  }
}
export default connect()(MapContainer)
