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

var Search = require('./../Common/Search');
var Item   = require('./Item');
var Detail = require('./Detail');
var API = require('./../API');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var resultsCache = {
    dataForQuery: {}
};

module.exports = React.createClass({
  getInitialState: function() {
    return {
      dataSource: ds.cloneWithRows([]),
      q: '',
      page: 0
    };
  },
  changeText: function(val) {
  	this.setState({
  		q: val
  	});
  }, 
  _search: function() {
  	var q = this.state.q;
  	this.setState({
  		q: q,
  		isLoading: true,
  		page: 0,
  		dataSource: ds.cloneWithRows([]), 
  	});
  	resultsCache.dataForQuery[q] = [];
  	this.fetchVideos(0)
  },
  render: function(){
    return(
    	<View style={styles.flex_1}>
    	   	<View style={[styles.search, styles.row]}>
	          <View style={styles.flex_1}>
	            <Search placeholder="输入检索词语" onChangeText={this.changeText}/>
	          </View>
	          <TouchableOpacity style={styles.btn} onPress={this._search}>
	            <Text style={styles.fontFFF}>Go</Text>
	          </TouchableOpacity>
        	</View>
        	{
        		this.state.dataSource.getRowCount() === 0 ?
	            <NoVideos
	                filter={this.state.q}
	                isLoading={this.state.isLoading}
	            />
        		:<ListView
	            dataSource={this.state.dataSource}
	            renderRow={this._renderRow}
                keyboardDismissMode="on-drag"
                onEndReached={this.onEndReached}
                automaticallyAdjustContentInsets={false}
                onEndReachedThreshold={300}
                pageSize={10}
                keyboardShouldPersistTaps={true}
                showsVerticalScrollIndicator={true}
	            />
        	}
        </View>
    );
  },
  _renderRow: function(row){
    return (
      <Item video={row} onSelect={() => this._loadPage(row)}/>
    );
  },
  _loadPage: function(row){
    this.props.navigator.push({
      component: Detail,
      passProps:{
        video: row
      }
    });
  },
  componentDidMount: function() {
  	this.fetchVideos(0);
  },

  fetchVideos: function(page) {
  	var q = this.state.q || 'ALLKANDOTA';
  	var query = {
  		page: page,
  		q: q
  	}
  	if(q === 'ALLKANDOTA') query.q = ""; 
  	cacheQ = resultsCache.dataForQuery[q] || [];
    API.fetchVideos(query).then((responseData) => {
	    if(!responseData) {
	        return;
	    }
	    resultsCache.dataForQuery[q] = _.union(cacheQ.concat(responseData));
	    console.log(resultsCache.dataForQuery[q].length);
	    this.setState({
	    	q: q,
	    	page: page + 1,
	    	isLoading: false,
	        dataSource: ds.cloneWithRows(resultsCache.dataForQuery[q]),
	    });
    }).done();
  },
  onEndReached: function() {
  	 this.setState({
  	 	isLoading: true
  	 })
  	 this.fetchVideos(this.state.page);
  }
});

var NoVideos = React.createClass({
    render: function() {
        var text = '没有找到相关的视频';
        if(this.props.isLoading){
            text = `正在获取数据...`;
        }
        else {
            text = `没有找到相关的视频`;
        }

        return (
            <View style={[styles.container, styles.centerText]}>
                <Text style={styles.noResultsText}>{text}</Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
	flex_1:{
		flex:1,
		marginTop:12
	},
	search:{
		paddingLeft:5,
		paddingRight:5,
		height:45
	},
	btn:{
		width:50,
		backgroundColor:'#0091FF',
		justifyContent:'center',
		alignItems:'center',
		marginTop: 12
	},
	fontFFF:{
		color:'#fff'
	},
	row:{
		flexDirection:'row'
	},
	centerText: {
	    alignItems: 'center',
	},
	noResultsText: {
	    marginTop: 80,
	    color: '#888888',
	},

});