var React = require('react-native');
var _ = require('underscore');
var {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  ScrollView,
  ActivityIndicatorIOS,
  TouchableOpacity
} = React;

var Item   = require('./Item');
var Detail = require('./Detail');
var API = require('./../API');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

module.exports = React.createClass({
  getInitialState: function() {
    return {
      dataSource: ds.cloneWithRows([])
    };
  },
  render: function(){
    return(
      <View style={styles.container}>
      	<ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
            keyboardDismissMode="on-drag"
            automaticallyAdjustContentInsets={false}
            onEndReachedThreshold={300}
            pageSize={10}
            keyboardShouldPersistTaps={true}
            showsVerticalScrollIndicator={true}
          />
        </View>
    );
  },
  _renderRow: function(row){
    return (
      <Item author={row} onSelect={() => this._loadPage(row)}/>
    );
  },
  _loadPage: function(row){
    this.props.navigator.push({
      component: Detail,
      passProps:{
        author: row
      }
    });
  },

  componentDidMount: function() {
  	this.fetchAuthor();
  },

  fetchAuthor: function(page) {
    API.fetchAuthors().then((responseData) => {
	    if(!responseData) {
	        return;
	    }
	    this.setState({
	       dataSource: ds.cloneWithRows(responseData),
	    });
    }).done();
  }
});

var styles = StyleSheet.create({
	container :{
    paddingTop: 15,
    flex:3,
    flexWrap: 'wrap',
    marginBottom: 24,
    overflowY: 'auto',
	},
	centerText: {
	    alignItems: 'center',
	},
	noResultsText: {
	    marginTop: 80,
	    color: '#888888',
	},

});