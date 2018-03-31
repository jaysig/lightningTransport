const NEW_ROUTE = 'NEW_ROUTE';

export const newRoute = route => {
  console.log(route, 'route');
  //Will need an axios call to send the coordinates to the backedn
  return {
    type: NEW_ROUTE,
    route
  }
}
