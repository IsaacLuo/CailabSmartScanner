import { Component } from "react";
import { BackHandler } from "react-native";

export default class RNComponent<IProps,IState> extends Component<IProps,IState> {
  protected _didFocusSubscription:any;
  protected _willBlurSubscription:any;
  
  constructor(props:any) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  public componentDidMount() {
    this._willBlurSubscription = (this.props as any).navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  public componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  protected onBackButtonPressAndroid = () => {
    (this.props as any).navigation.goBack();
    return true;
  }
}