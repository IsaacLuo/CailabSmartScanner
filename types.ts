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
  basket: IBasketState,
  assignTubes: IAssignTubesState,
}

export interface IRouteState {
  path: string,
}

export interface IReactNavigatingProps {
  navigation:NavigationScreenProp<any,any>
}

export interface IBasketState {
  pickLists: IBasket[],
  defaultPickListId: string,
  loadingGetMyPicklists: boolean,
}

export interface IBasket {
  _id: string,
  createdAt: Date,
  updatedAt: Date,
  name: string,
  partsCount: number,
  parts: IPart[],
}

export interface IAssignTubesState {
  parts: IPart[],
  loadingParts: boolean,
}

export interface IPart {
  _id: string,
  labName: string,
  personalName: string,
  barcodes?: string[],
}