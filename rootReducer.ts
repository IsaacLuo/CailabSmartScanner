// redux
import { combineReducers } from 'redux'

// other reducers
import appReducer from './reducers/app/reducer'
import basketReducer from './reducers/basket/reducer'
import navigateReducer from './navigateReducer'
import assignTubesReducer from './screens/AssignTubes/reducer'

export default combineReducers({
  app: appReducer,
  basket: basketReducer,
  nav: navigateReducer,
  assignTubes: assignTubesReducer,
});