'use strict';

var React = require('react-native');
var {
    AppRegistry,
    NavigatorIOS,
    StyleSheet,
    TabBarIOS,
    Text,
    View,
} = React;

var Video = require('./Video/List');
var Author = require('./Author/List');
var About  = require('./About/Detail');
var Navigation = require('./Common/Navigation');

var newswatchApp = React.createClass({
    getInitialState: function() {
        return {
            selectedTab: "视频"
        }
    },
    render: function() {
        return (
            <TabBarIOS>
                <TabBarIOS.Item
                    title="视频"
                    selected={this.state.selectedTab==="视频"}
                    icon={require('image!movie')}
                    onPress={() => {
                            this.setState({
                                selectedTab: "视频"
                            })
                        }
                    }>
                <Navigation component={Video}/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="解说"
                    icon={require('image!person')}
                    selected={this.state.selectedTab==="解说"}
                    onPress={() => {
                            this.setState({
                                selectedTab: "解说"
                            })
                        }
                    }>
                    <Navigation component={Author}/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="关于"
                    icon={require('image!question')}
                    selected={this.state.selectedTab==="关于"}
                    onPress={() => {
                            this.setState({
                                selectedTab: "关于"
                            })
                        }
                    }>
                    <Navigation component={About}/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

AppRegistry.registerComponent('newswatch', () => newswatchApp);

module.exports = newswatchApp;
