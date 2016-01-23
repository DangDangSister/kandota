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
    Text,
    StyleSheet,
    View,
    WebView,
    ScrollView,
} = React;

var Header = require('./../Common/Header');

var Detail = React.createClass({

    getInitialState: function() {
        return {
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
        };
    },

    render: function() {
        var str = this.props.video.href;
        var videoId = str.substring(str.indexOf('id_')+3,str.indexOf('.html'))
        var url = 'http://player.youku.com/embed/'+videoId;
        return (
            <ScrollView>
                <Header
                    navigator={this.props.navigator}
                    initObj={{
                        backName: '视频',
                        title: this.props.video.title
                    }}/>
                <View style={MKCardStyles.card}>
                    <Text style={MKCardStyles.content}>
                    {this.props.video.title} | {this.props.video.author}
                    </Text>
                    <WebView
                        style={styles.frame}
                        url={url}
                        renderLoading={this.renderLoading}
                        renderError={this.renderError}
                        automaticallyAdjustContentInsets={true}
                        startInLoadingState={true}
                        domStorageEnabled={true}
                        bounces={true}
                    />
                </View>
            </ScrollView>
        );
    },
    renderLoading: function () {
        return (
            <View style={[styles.container, styles.centerText]}>
                <Text style={MKCardStyles.content}>加载视频...</Text>
            </View>
        );
    },
    renderError: function () {
        return (
            <View style={[styles.container, styles.centerText]}>
                <Text style={MKCardStyles.content}>视频没有找到 - 404</Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cccccc',
        flexDirection: 'column'
    },
    centerText: {
        marginBottom: 3,
        paddingTop: 10,
    },
    noResultsText: {
        marginTop: 70,
        marginBottom:0,
        color: '#000000',
    },
    frame: {
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        height:250,
    }
});

module.exports = Detail;
