'use strict';

/* Filters */

angular.module('junkMailApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }])
  .filter('toLocalTime', function(){
	  return function(time) {
	      return new Date(time).toLocaleString();
	    };
  })
  .filter('fromBase64', function(version) {
    return function(text) {
		var decoded = '';
		try{
			decoded = decodeURIComponent(escape(window.atob( text )))
		}catch(err){
			decoded = text;
		}
      return decoded;
    };
  });