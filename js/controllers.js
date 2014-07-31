'use strict';

/* Controllers */

angular.module('junkMailApp.controllers', [])
	.controller('MainCtrl', ['$scope', 'InboxService',
		function($scope, service) {

			$scope.inboxName = service.getInboxName();

		}
	])

.controller('InboxCtrl', ['$scope', 'InboxService',
	function($scope, service) {
		var inboxName = service.getInboxName();
		service.getMessages().then(function(messages) {			
			$scope.messages = messages;
		}, function(reason) {
			console.log("Error getting messages:"+reason);
		});

	}
])

.controller('MessageCtrl', ['$scope', '$routeParams', 'InboxService',
	function($scope, $routeParams, inboxService) {
		$scope.message = inboxService.getMessages().then(function(messages) {			
			$scope.message = messages[$routeParams.messageId];
		}, function(reason) {
			console.log("Error getting messages:"+reason);
		});

	}
]);
