import { NEW_ROUTE } from '../actions/index';

const map = (state = [], action) => {
  switch(action.type) {
    case NEW_ROUTE:
      return [
        ...state,
        {

        }
      ]
    default:
      return state
  }
}

export default map
