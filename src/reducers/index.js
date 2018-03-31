import { combineReducers } from 'redux';
import MapReducer from './map_reducer';

const rootReducer = combineReducers({
  map: MapReducer
});

export default rootReducer;
