import RNComponent from "./RNComponent";

export default class DrawerBaseComponent<IProps,IState> extends RNComponent<IProps,IState> {
  constructor(props:any) {
    super(props);
  }
  protected onBackButtonPressAndroid = () => {
    (this.props as any).navigation.openDrawer();
    return true;
  }
}