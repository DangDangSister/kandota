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

var Detail = React.createClass({
    render: function() {
        return (
            <ScrollView>
                <View style={MKCardStyles.card}>
                    <Text style={MKCardStyles.content}>
                        KanDota是一个视频收集应用，收集了Dota&Dota2相关的比赛视频&解说视频，
                        这纯粹是个人项目，版权归视频作者所有，当然如果你想看的解说视频网站，
                        可以联系小编,小编会整理出来放到这个上面供大家观看.
                    </Text>
                </View>
            </ScrollView>
        );
    }
});

module.exports = Detail;
