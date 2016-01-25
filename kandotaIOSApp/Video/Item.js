'use strict';

var moment = require('moment');

var React = require('react-native');
var MK = require('react-native-material-kit');

var {
 MKButton,
  MKColor,
  MKIconToggle,
  MKCardStyles
} = MK;

var {
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    TouchableHighlight,
    ScrollView,
    View
} = React;

var Item = React.createClass({
    render: function() {
        var pubDate = moment(this.props.video.created_at).fromNow(true);
        var title = this.props.video.title;
        var author = this.props.video.author;
        var defaultImg = require('image!story-background');
        var thumbnail = {uri:((this.props.video.img || this.props.video.avtar) || "")};
        return (
             <TouchableHighlight onPress={this.props.onSelect} style={{marginTop: 5,borderColor:'#ccc'}}>
                <View>
                  <View style={MKCardStyles.card}>
                  {
                    thumbnail.uri.length === 0 ?
                    <Image source={defaultImg} style={MKCardStyles.image} />
                    :<Image source={thumbnail} style={MKCardStyles.image}/>
                   }
                    <Text style={MKCardStyles.title}>{author}</Text>
                    <View
                      style={{
                        padding : 15,
                      }}
                      >
                      <Text style={[MKCardStyles.content, {padding:0}]}>
                       {title} . {pubDate}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
        );
    }
});

var DelayedImage = React.createClass({
        propTypes: Image.propTypes,
        getInitialState(): { showImage: boolean } {
        return { showImage: true };
    },
    componentWillReceiveProps: function(nextProps: any) {
        if(this.props.source.uri != nextProps.source.uri) {
            this.setState({ showImage: false });
            setTimeout(() => this.setState({ showImage: true }), 0);
        }
    },
    render: function(): React.Component {
        return <Image {...this.props} source={{uri: this.state.showImage ? this.props.source.uri : null}}/>
    },
});

module.exports = Item;