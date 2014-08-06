'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('junkMailApp.services', ['firebase'])
	.value('version', '0.2')
	.value('base_url', 'https://sweltering-fire-2054.firebaseio.com/')
	.factory('PageService', function() {
		var mesCount = 0;
		return {
			incrMessageCount: function() {
				mesCount++;
			},
			decrMessageCount: function() {
				mesCount--;
			},
			getMessageCount: function() {
				return mesCount;
			}
		};
	})
	.factory('NameService', function() {
		var possible = "234679ACDEFGHJKMNPQRTVWXYZ";
		var text = '';
		for (var i = 0; i < 5; i++){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return {
			getInboxName: function() {
				return text;
			},
			generateNewName: function() {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
				return text;
			}
		};
	})
	.factory('InboxService', ['$q', '$firebase', 'base_url', 'NameService',
		function($q, $firebase, base_url, nameService) {
			var baseRef = new Firebase(base_url);
			var messagesRef = $q.defer();

			var auth = new FirebaseSimpleLogin(baseRef, function(error, user) {
				if (error) {
					// an error occurred while attempting login
					console.log(error);
					messagesRef.reject(error);
				} else if (user) {
					// user authenticated with Firebase
					console.log("User ID: " + user.uid + ", Provider: " + user.provider);
					var userDir = baseRef.child('users').child(nameService.getInboxName());
					var priority = 253370764800 * 1000 - (new Date().getTime());
					console.log("Initial message priority=" + priority.toString());
					userDir.onDisconnect().remove();
					userDir.setWithPriority({
						user_id: user.uid,
						messages: {
							0: {
								"body": "<body><p>Just use it</p></body>",
								"date": new Date().getTime(),
								"from": "support@junkmail.tk",
								"subject": "About service usage"
							}
						}
					}, priority);
					messagesRef.resolve($firebase(userDir.child('messages')));
				} else {
					// user is logged out
					console.log("User logout");
					auth.login('anonymous');
				}
			});			
			return {
				getMessages: function() {
					return messagesRef.promise;
				}
			};
		}
	]);
