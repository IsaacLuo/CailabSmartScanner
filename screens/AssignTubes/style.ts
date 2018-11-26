import { Constants } from 'expo';
const statusBarHeight = Constants ? Constants.statusBarHeight:0;

const React = require("react-native");
const { Platform, Dimensions, StyleSheet } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10
  },
  drawerImage: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
    top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
    width: 210,
    height: 75,
    resizeMode: "cover"
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  },
  header: {
    paddingTop: Platform.OS === "android" ? statusBarHeight : undefined
  },
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  cardItem: {
    backgroundColor: 'transparent',
  },
  barcodeContainer: {
    marginLeft: 20,
    width: '100%',
  },
  barcodeInput: {
    backgroundColor:'#fff',
    width: '100%',
    
  }
});
