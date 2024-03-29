var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  TextInput,
  PixelRatio
} = React;

module.exports = React.createClass({
  render: function(){
    return (
      <View style={styles.flex_1}>
        <TextInput style={[styles.flex_1, styles.input]} {...this.props}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  flex_1:{
    flex:1
  },
  input:{
    borderWidth: 1 / PixelRatio.get(),
    height:40,
    borderColor:'#DDDDDD',
    paddingLeft:5
  }
});