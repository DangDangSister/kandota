'use strict';

var moment = require('moment');

var React = require('react-native');

var {
    Text,
    StyleSheet,
    View,
    WebView,
    } = React;

var ViewVideo = React.createClass({

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
            <View style={styles.container}>
                <Text style={[styles.noResultsText, styles.centerText]}>
                {this.props.video.title} | {this.props.video.author}
                </Text>
                <WebView
                    style={styles.frame}
                    url={url}
                    renderLoading={this.renderLoading}
                    renderError={this.renderError}
                    automaticallyAdjustContentInsets={false}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    bounces={true}
                />
            </View>
        );
    },
    renderLoading: function () {
        console.log('## webView: loading()');
        return (
            <View style={[styles.container, styles.centerText]}>
                <Text style={styles.noResultsText}>加载视频...</Text>
            </View>
        );
    },
    renderError: function () {
        return (
            <View style={[styles.container, styles.centerText]}>
                <Text style={styles.noResultsText}>视频没有找到 - 404</Text>
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
        marginBottom:5,
    },
    noResultsText: {
        marginTop: 70,
        marginBottom:0,
        color: '#000000',
    },
    frame: {
        marginTop: 0
    }
});

module.exports = ViewVideo;
