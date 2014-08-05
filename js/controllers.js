'use strict';

/* Controllers */

angular.module('junkMailApp.controllers', [])
	.controller('HeadCtrl', ['$scope', 'InboxService', 'PageService',
		function($scope, inboxService, pageSrvc) {
			$scope.page_title = 'Welcome';
			inboxService.getMessages().then(function(messages) {
				messages.$on('child_added', function(childSnapshot, prevChildName) {
					pageSrvc.incrMessageCount();
					$scope.page_title = pageSrvc.getMessageCount().toString() + ' new messages';
				});
				messages.$on('child_changed', function(childSnapshot, prevChildName) {
					var updatedMessage = childSnapshot.snapshot.value;
					if(updatedMessage.is_new == 'false'){
						pageSrvc.decrMessageCount();
						$scope.page_title = pageSrvc.getMessageCount().toString() + ' new messages';
					}else{
						pageSrvc.incrMessageCount();
						$scope.page_title = pageSrvc.getMessageCount().toString() + ' new messages';
					}
				});
			}, function(reason) {
				console.log("Error getting messages:" + reason);
			});
		}
	])
	.controller('MainCtrl', ['$scope', 'InboxService',
		function($scope, service) {

			$scope.inboxName = service.getInboxName();

		}
	])

.controller('InboxCtrl', ['$scope', 'InboxService', 'PageService',
	function($scope, service, pageSrvc) {
		var inboxName = service.getInboxName();
		service.getMessages().then(function(messages) {
			$scope.messages = messages;
		}, function(reason) {
			console.log("Error getting messages:" + reason);
		});
		return {
			getMessageStyle: function(v){
				if(v.is_new == 'false'){
					return 'background-color: white;'
				}else{
					return 'background-color: red;'
				}
			}
		};
	}
])

.controller('MessageCtrl', ['$scope', '$routeParams', 'InboxService',
	function($scope, $routeParams, inboxService) {
		$scope.message = inboxService.getMessages().then(function(messages) {
			var messageRef = messages.$getRef();
			messageRef.child($routeParams.messageId).child('is_new').set('false');
			$scope.message = messages[$routeParams.messageId];			
		}, function(reason) {
			console.log("Error getting messages:" + reason);
		});

	}
]);
