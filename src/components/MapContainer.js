import React, { Component} from 'react';
import axios from 'axios';
import MapArea from './Map'
import MapForm from './MapForm'
import { connect } from 'react-redux';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { newRoute } from '../actions';
import config from '../../config.json'
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");


class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      start: 'Dallas, TX',
      end: '',
      mapCenter: {lat:32.7844217, lng:-96.8069456},
      directions: {routes: []}
    }
    this.changeStart = (start) => this.setState({ start })
    this.changeEnd = (end) => this.setState({ end })
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.updateDirections = this.updateDirections.bind(this)
  }

  updateDirections(directions) {
    this.setState({directions})
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
        this.setState({mapCenter: startCords})

        let cords = {
          startCords,
          endCords
        }
        // this.props.dispatch(newRoute(cords))
        // origin: cords.startCords,
        // destination: cords.endCords,
        let directionRequest = {
          origin: this.state.start,
          destination: this.state.end,
          travelMode: "DRIVING"
        }
        // axios.post('http://localhost:8081/route', { directionRequest })
        // .then(function(result){
        //   console.log(result);
        //   dispatch(routeToken(result));
        // });
        axios.post('http://localhost:8081/route', { directionRequest })
          .then(res => {
            // console.log(res,'resly');
            // console.log(res.data);
            // let bounds = res.data.routes[0].bounds
            // let newBound = {
            //   b: {b: bounds.northeast.lat, f: bounds.northeast.lng},
            //   f: {b: bounds.southwest.lat, f: bounds.southwest.lng}
            // }
            // res.data.routes[0].bounds = newBound
            this.setState({ directions: res.data})
            console.log(this.state,'directing');
            console.log('End', startCords, endCords);
          })

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
    }
    return(
      <div className="maxW">
        <MapArea
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${config.google.maps}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: '50vh', width: '50%' }} />}
          containerElement={<div style={{ height: '60vh', width: '50%' }} className="maxW"/>}
          mapElement={<div style={{ height: `100%` }} />}
          directions={this.state.directions}
          start={this.state.start}
          end={this.state.end}
          center={this.state.mapCenter}
          updateDirections={this.updateDirections}
        />
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
