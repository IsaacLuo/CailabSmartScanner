export interface IAction {
  type: string,
  data: any,
}

export interface IAppState {
  message: string,
  username: string,
  token: string,
}

export interface IStoreState {
  app: IAppState,
}