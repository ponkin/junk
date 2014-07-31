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
  .filter('toZBase32', function(){
	  return function(text) {
		  //XXX: надо конечно bitwise сдвигами реализовать
		  
		  var alphabet = 'ybndrfg8ejkmcpqxot1uwisza345h769';
		  var bits = 0;
		  var buffer = '';
		  var result = '';
		  
		  for(var i=0;i<text.length;i++){
			  buffer += text.charCodeAt(i).toString(2);
		  }		  
		  
		  for(var j=0;j<buffer.length;j+=5){
			  var idx = buffer.slice(j, Math.min(j+5, buffer.length));
			  result += alphabet.charAt(parseInt(idx, 2));
		  }
		  
	      return result;
	    };
  })  
  .filter('fromZBase32', function(){
	  return function(text) {
		  
		  var lflag = 0x8000000000000000;
		  
		  var alphabet = 'ybndrfg8ejkmcpqxot1uwisza345h769';
		  var table = {};
		  var buffer = '';
		  
		  var result = '';
		  
		  for (var i = 0; i < alphabet.length; i++) {
		          table[alphabet[i]] = i
		   }	
		   
 		  for(var j=0;j<text.length;j++){
 			  
 			  buffer += table[text.charAt(j)].toString(2);
 		  }	  
		  
		  for(var j=0;j<buffer.length;j+=16){
			  var idx = buffer.slice(j, Math.min(j+16, buffer.length));
			  result += String.fromCharCode(parseInt(idx, 2));
		  }		  
		  
	      return result;
	    };
  })
  ;