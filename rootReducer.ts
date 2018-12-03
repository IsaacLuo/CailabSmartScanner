// redux
import { combineReducers } from 'redux'

// other reducers
import appReducer from './reducers/app/reducer'
import basketReducer from './reducers/basket/reducer'
import navigateReducer from './navigateReducer'
import assignTubesReducer from './screens/AssignTubes/reducer'
import partDetailReducer from './screens/PartDetail/reducer'
import loginReducer from './screens/Login/reducer';

export default combineReducers({
  app: appReducer,
  login: loginReducer,
  basket: basketReducer,
  nav: navigateReducer,
  assignTubes: assignTubesReducer,
  partDetail: partDetailReducer,
});