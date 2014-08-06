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
	.controller('MainCtrl', ['$scope', 'NameService',
		function($scope, service) {
			$scope.inboxName = service.getInboxName();
			$scope.inbox = service.getInboxName() + '@junkmail.tk';
			return {
					getInboxCopy: function(){
						return service.getInboxName() + '@junkmail.tk';
					}
			};
		}
	])

.controller('InboxCtrl', ['$scope', 'InboxService', 'PageService',
	function($scope, service, pageSrvc) {
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
