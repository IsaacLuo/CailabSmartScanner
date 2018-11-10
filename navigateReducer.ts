import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';

import AppNavigator from './navigator';

const navReducer = createNavigationReducer(AppNavigator);
export default navReducer;