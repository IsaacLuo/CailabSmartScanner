import { NavigationScreenProp } from 'react-navigation'

export interface IAction {
  type: string,
  data: any,
}

export interface IAppState {
  message: string,
  username: string,
  token: string,
  drawerVisible: boolean,
}

export interface IStoreState {
  app: IAppState,
  route: IRouteState,
  nav: any,
}

export interface IRouteState {
  path: string,
}

export interface IReactNavigatingProps {
  navigation:NavigationScreenProp<any,any>
}

export interface IBasketState {
  allBaskets: any[],
  currentBasketId: string,
  currentBasketContent: any[],
}