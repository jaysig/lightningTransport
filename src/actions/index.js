const NEW_ROUTE = 'NEW_ROUTE';
import axios from 'axios';

// POST /route: Submit start point and drop-off locations
// GET /route/<TOKEN>: Get shortest driving route

export const newRoute = route => {
  return dispatch => {
    console.log(route, 'route');
    let directionRequest = {
      origin: route.startCords,
      destination: route.endCords,
      travelMode: "DRIVING"
    }
    console.log(directionRequest,'directions');
    console.log(axios.post);
    // axios.post('http://localhost:8081/route', { directionRequest })
    // .then(function(result){
    //   console.log(result);
    //   dispatch(routeToken(result));
    // });

  }


}

function routeToken(route){
  return {
    type: NEW_ROUTE,
    route
  }
}
