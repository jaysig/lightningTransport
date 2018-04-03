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
    this.directionButton = this.directionButton.bind(this)
  }

  updateDirections(directions) {
    this.setState({directions})
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    let startCords = {}
    let endCords = {}
    let cordArray = [];
    let cordTest;

    geocodeByAddress(this.state.start)
      .then((results) => {
        let geo = results[0].geometry.location
        return getLatLng(results[0])
      })
      .then(({lat, lng}) => {
        startCords = {
          lat,
          lng
        }
        cordArray[0] = [lat, lng]
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
        cordArray[1] = [lat, lng]
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
        // console.log(cordArray, 'cord Check');
        axios.post('http://localhost:8081/route', cordArray)
          .then(res => {
            // console.log(res,'resly');
            // console.log(res.data);
            // if(res.data.routes) {
            //   let bounds = res.data.routes[0].bounds
            //   let newBound = {
            //     b: {b: bounds.northeast.lat, f: bounds.northeast.lng},
            //     f: {b: bounds.southwest.lat, f: bounds.southwest.lng}
            //   }
            //   // res.data.routes[0].bounds = newBound
            //   // delete res.data.routes[0].bounds
            //   const leg = res.data.routes[0].legs[0]
            //   res.data.request = {
            //     destination: {query: leg.end_address},
            //     origin: {query: leg.start_address},
            //     travelMode: "DRIVING"
            //   }
            //   console.log(res.data,'DATA BE here');
            //   this.setState({ directions: res.data})
            //   // console.log(this.state,'directing');
            //   // console.log('End', startCords, endCords);
            // } else {
            //   console.log(res.data);
            // }
            console.log("Success", res.data);
          })
          .catch(error => console.error('Axios Post', error))

      })
      .catch(error => console.error('Error in the End', error))
  }
  directionButton() {
    axios.get('http://localhost:8081/route/axjl-123XL')
      .then(res => {
        // console.log(res.data);
        if(res.data.path) {
          // let bounds = res.data.routes[0].bounds
          // let newBound = {
          //   b: {b: bounds.northeast.lat, f: bounds.northeast.lng},
          //   f: {b: bounds.southwest.lat, f: bounds.southwest.lng}
          // }
          // res.data.routes[0].bounds = newBound
          // delete res.data.routes[0].bounds
          // const leg = res.data.routes[0].legs[0]
          let startCords = {lat: res.data.path[0][0], lng: res.data.path[0][1]}
          let endCords = {lat: res.data.path[1][0], lng: res.data.path[1][1]}
          res.data.request = {
            destination: {query: startCords},
            origin: {query: endCords},
            travelMode: "DRIVING"
          }
          this.setState({
            directions: res.data,
            endLocation: startCords,
            startLocation: endCords
          })
        } else {
          console.log(res.data);
        }
      })
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
          loadingElement={<div style={{ height: '50vh', width: '50%' }} />}
          containerElement={<div style={{ height: '60vh', width: '50%' }} className="maxW"/>}
          mapElement={<div style={{ height: `100%` }} />}
          directions={this.state.directions}
          start={this.state.start}
          end={this.state.end}
          center={this.state.mapCenter}
          updateDirections={this.updateDirections}
          endLocation={this.state.endLocation}
          startLocation={this.state.startLocation}
        />
        <MapForm
          formSubmit={this.handleFormSubmit}
          start={start}
          end={end}
          cssClasses={cssClasses}
        />
        <button onClick={this.directionButton}> Render Directions </button>
      </div>
    )
  }
}
export default connect()(MapContainer)
