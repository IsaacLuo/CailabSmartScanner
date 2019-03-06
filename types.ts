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
  partLocation: IPartLocationState,
  partDetail: IPartDetailState,
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
  focusedPartIndex: number,
}

export interface IPartLocationState {
  parts: IPart[],
  loadingParts: boolean,
}

export interface IPart {
  _id: string,
  labName: string,
  personalName: string,
  barcodes?: string[],
  containers: IContainer[],
}

export interface IPartDetail {
  _id: string,
  labName: string,
  labPrefix: string,
  labId: number,
  personalPrefix: string,
  personalId: number,
  personalName: string,
  ownerId?: string,
  sampleType?: string,
  comment?: string,
  createdAt: Date,
  updatedAt: Date,
  date?: Date, 
  tags?: string[],
  content?: {
    // primers only
    description?: string,
    sequence?: string,
    orientation?: string,
    meltingTemperature?: number,
    concentration?: string,
    vendor?: string,
    
    // bacteria only
    plasmidName?: string,
    hostStrain?: string,

    // yeasts only
    parents?: string[],
    genotype?: string[],
    plasmidType?: string,

    // bacteria and yeasts
    markers?: string,
    // all
    customData?: any,
  },
  attachments?: [{
    fileName: string,
    contentType: string,
    fileSize: number,
    fileId: string,
  }],
  container?: {
    type: string,
    barcode: string,
  },
}

export interface IPartDetailState {
  loading: boolean,
  partDetail: any,
}

export interface IContainer {
  _id: string,
  ctype: string,
  assignedAt: string,
  barcode: string,
  wellName: string,
  currentStatus: string,
  parentContainer: {
    _id: string,
    ctype: string,
    barcode: string,
    currentStatus: string,
    location: ILocation;
  }
  location: ILocation;
}

export interface ILocation {
  barcode: string,
  description: string,
}