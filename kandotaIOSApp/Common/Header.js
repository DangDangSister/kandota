var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  ScrollView,
  TouchableOpacity,
  PixelRatio
  } = React;

module.exports = React.createClass({
  render: function(){
    var obj = this.props.initObj;
    return (
      <View style={[styles.header, styles.row, styles.center]}>
        <TouchableOpacity style={[styles.row,styles.center]} onPress={this._pop}>
          <LeftIcon/>
          <Text style={styles.fontFFF}>{obj.backName}</Text>
        </TouchableOpacity>
        <View style={[styles.title, styles.center]}>
          <Text style={[styles.fontFFF, styles.titlePos]} numberOfLines={1}>{obj.title}</Text>
        </View>
      </View>
    );
  },

  _pop: function(){
    this.props.navigator.pop();
  }
});

LeftIcon = React.createClass({
  render: function(){
    return (
      <View>
        <View style={styles.go}>
        </View>
      </View>
    );
  }
});


var styles = StyleSheet.create({
  row:{
    flexDirection:'row'
  },
  header:{
    marginTop: 20,
    height:50,
    backgroundColor:'#3497FF'
  },
  fontFFF:{
    color:'#fff',
    fontSize:17,
    fontWeight:'bold'
  },
  title:{
    flex:1
  },
  titlePos:{
    marginLeft:-20,
    width:200
  },
  center:{
    justifyContent:'center',
    alignItems:'center'
  },
  go:{
    borderLeftWidth: 4 * 1 / PixelRatio.get(),
    borderBottomWidth: 4 * 1 / PixelRatio.get(),
    width:15,
    height:15,
    transform: [{rotate: '45deg'}],
    borderColor:'#FFF',
    marginLeft:10
  }
});