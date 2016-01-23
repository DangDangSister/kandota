'use strict';

var moment = require('moment');

var React = require('react-native');
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
        var thumbnail = {uri:this.props.video.img};
        var defaultImg = require('image!story-background');
        return (
            <View>
                <TouchableHighlight onPress={this.props.onSelect} style={styles.item}>
                    <View style={styles.row}>
                        <DelayedImage
                            defaultSource={defaultImg}
                            source={thumbnail}
                            style={styles.cellImage}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.title} numberOfLines={2}>{title}</Text>
                            <Text style={styles.channel} numberOfLines={1}>
                                {author} {' '} &bull;{' '} {pubDate} &bull;{' '}
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={styles.cellBorder} />
            </View>
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
        return <Image {...this.props} source={{uri: this.state.showImage ? this.props.source.uri : null}} />
    },
});

var styles = StyleSheet.create({
    item:{
        marginTop:5,
        borderColor:'#ccc'
    },
    textContainer: {
        flex: 1,
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 2,
    },
    channel: {
        color: '#999999',
        fontSize: 12,
    },
    row: {
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 5,
    },
    cellImage: {
        backgroundColor: '#dddddd',
        height: 65,
        marginRight: 10,
        width: 60,
    },
    cellBorder: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 1,
        marginLeft: 4,
    },
});

module.exports = Item;