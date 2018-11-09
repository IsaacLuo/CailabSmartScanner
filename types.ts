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
}

export interface IRouteState {
  path: string,
}