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
                    selected={this.state.selectedTab==="解说"}
                    onPress={() => {
                            this.setState({
                                selectedTab: "解说"
                            })
                        }
                    }>
                    <View><Text>this is a 解说</Text></View>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="关于"
                    selected={this.state.selectedTab==="关于"}
                    onPress={() => {
                            this.setState({
                                selectedTab: "关于"
                            })
                        }
                    }>
                    <View><Text>this is a 关于</Text></View>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

AppRegistry.registerComponent('newswatch', () => newswatchApp);

module.exports = newswatchApp;
