
const {StyleSheet, StatusBar, Platform} = require("react-native");

export default StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
        android: {
            paddingTop: StatusBar.currentHeight,
            backgroundColor: 'black',
        }
    })
  }
})