'use strict';

var React = require('react-native');

var {
  AsyncStorage,
} = React;

var VIDEO_API = "http://kandota.thnuclub.com/api/vidoes";

function safeFetch(reqUrl: string) {
  	return new Promise((resolve, reject) => {
	    fetch(reqUrl)
	      .then((response) => response.json())
	      .then((responseData) => {
	        resolve(responseData);
	      })
	      .catch((error) => {
	      	console.log(err);
	        resolve(null);
	      });
  });
}

module.exports = {
	fetchVideos: function(o) {
		var uri = VIDEO_API;
		if(o) {
			uri = VIDEO_API+"?page="+o.page+"&q="+(o.q||"");
		}
		console.log(uri);
		return safeFetch(uri)
			.then((videos) => {
				return videos;
			})
	},
	fetchAuthors: function() {
		var uri = "http://kandota.thnuclub.com/api/authors";
		return safeFetch(uri)
			.then((authors) => {
				return authors;
			})
	}
};