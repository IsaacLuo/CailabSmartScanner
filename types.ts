interface IAction {
  type: string,
  data: any,
}

interface IStoreState {
  app: {
    message: string,
  }
}