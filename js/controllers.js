'use strict';

/* Controllers */

angular.module('junkMailApp.controllers', [])
  .controller('MainCtrl', ['$scope', 'FirebaseService', function($scope, service) {
  	
	  var inboxURL = service.getInboxURL();
	  var parts = inboxURL.split('/');

	  $scope.inboxName = parts[parts.length-1];
	  
  }])

  .controller('InboxCtrl', ['$scope', 'FirebaseService', function($scope, service) {	    

	  $scope.messages = service.getFirebase();
	  
  }])
  
  .controller('MessageCtrl', ['$scope', '$routeParams', 'FirebaseService', function($scope, $routeParams, service) {
	  
	  $scope.message = service.getFirebase()[$routeParams.messageId];

  }]);