'use strict';

var React = require('react-native');
var {
    ActivityIndicatorIOS,
    ListView,
    StyleSheet,
    Text,
    TextInput,
    View,
    } = React;
var TimerMixin = require('react-timer-mixin');

var VideoRow = require('./VideoRow');
var VideoWebView = require('./VideoWebView');
var API = require('./API');

var resultsCache = {
    dataForQuery: {},
};

var baseDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var MainScreen = React.createClass({
    mixins: [TimerMixin],
    timeoutID: (null: any),

    getInitialState: function() {
        return {
            isLoading: true,
            dataSource: baseDataSource,
            filter: 'all',
            page: 1,
        };
    },

    componentDidMount: function() {
        var _filter = this.props.filter || this.state.filter;
        this.fetchVideos(_filter, this.state.page);
    },

    fetchVideos: function(query: string, page) {
        
        API.fetchVideos({page: page}).then((responseData) => {
                if(!responseData){ // abort when no videos
                    console.log('### no responseData');
                    return;
                }
                if (!resultsCache.dataForQuery[query]) {
                    resultsCache.dataForQuery[query] = [];
                }
                resultsCache.dataForQuery[query] = resultsCache.dataForQuery[query].concat(responseData);
                this.setState({
                    isLoading: false,
                    page: page + 1,
                    dataSource: baseDataSource.cloneWithRows(resultsCache.dataForQuery[query]),
                });
            }).done();
    },

    handleScroll: function(event: Object) {
    },

    onEndReached: function() {
        this.setState({isLoading: true});
        this.clearTimeout(this.timeoutID);
        this.timeoutID = this.setTimeout(() => this.fetchVideos("all", this.state.page), 250);
    },

    render: function() {

        var results = this.state.dataSource.getRowCount() === 0 ?
            <NoVideos
                filter={this.state.filter}
                isLoading={this.state.isLoading}
            /> :
            <ListView
                ref="listview"
                dataSource={this.state.dataSource}
                renderHeader={this.renderHeader}
                renderRow={this.renderRow}
                automaticallyAdjustContentInsets={false}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps={true}
                showsVerticalScrollIndicator={false}
                onEndReached={this.onEndReached}
                onScroll={this.handleScroll}
            />;

            return (
                <View style={styles.container}>
                    <View style={[styles.separator, {marginTop: 64}]} />
                    {results}
                </View>
            );
    },

    selectVideo: function(video: Object) {
        this.props.navigator.push({
            title: video.title,
            component: VideoWebView,
            passProps: {
                video: video
            }
        });
    },


    renderRow: function(video: Object)  {
        return (
            <VideoRow
                onSelect={() => this.selectVideo(video)}
                video={video}
            />
        );
    },

    renderHeader: function () {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicatorIOS
                        animating={this.state.isLoading}
                        style={[{marginTop: 10}]}
                    />
                </View>
            );
        }
    },

});

var NoVideos = React.createClass({
    render: function() {
        var text = 'no results found';
        if (this.props.filter) {
            if(this.props.isLoading){
                text = `Loading results`;
            }
            else {
                text = `No results`;
            }
        }

        return (
            <View style={[styles.container, styles.centerText]}>
                <Text style={styles.noResultsText}>{text}</Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    centerText: {
        alignItems: 'center',
    },
    noResultsText: {
        marginTop: 80,
        color: '#888888',
    },
    separator: {
        height: 1,
        backgroundColor: '#eeeeee',
    },
    spinner: {
        width: 30,
    },
    scrollSpinner: {
        marginVertical: 20,
    },
    wrapper: {
        height: 60,
        marginTop: 10,
    },
    loading: {
        height: 20,
    },
});

module.exports = MainScreen;
