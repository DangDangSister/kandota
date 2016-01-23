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
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
        };
    },

    render: function() {
        return (
            <ScrollView>
                <Header
                    navigator={this.props.navigator}
                    initObj={{
                        backName: '解说',
                        title: this.props.author.name
                    }}/>
            </ScrollView>
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
