const {StyleSheet, Dimensions, Platform} = require("react-native");
const deviceHeight = Dimensions.get("window").height;

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight * 0.24,
    marginBottom: 30
  },
  userBarcodeContainer: {
    marginTop: deviceHeight * 0.24,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 40 : 50,
    top: Platform.OS === "android" ? 35 : 60,
    width: 280,
    height: 100
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
  },
  version: {
    color: "#D8D8D8",
    height: 50,
    bottom: 6,
    marginTop: 5
  },
  errorMessageContainer:{
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    backgroundColor: 'rgba(255,0,0,0.8)',
    color:'black',
    flex:1,
    textAlign:'center',
  }
};
