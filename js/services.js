'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('junkMailApp.services', ['firebase'])
	.value('version', '0.1')
	.value('base_url', 'https://sweltering-fire-2054.firebaseio.com/')
	.factory('InboxService', ['$q', '$firebase', 'base_url',
		function($q, $firebase, base_url) {
			var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
			var text = '';

			var baseRef = new Firebase(base_url);
			var messagesRef = $q.defer();

			for (var i = 0; i < 5; i++)
				text += possible.charAt(Math.floor(Math.random() * possible.length));

			var auth = new FirebaseSimpleLogin(baseRef, function(error, user) {
				if (error) {
					// an error occurred while attempting login
					console.log(error);
					messagesRef.reject(error);
				} else if (user) {
					// user authenticated with Firebase
					console.log("User ID: " + user.uid + ", Provider: " + user.provider);
					var userDir = baseRef.child('users').child(text);
					userDir.set({
						user_id: user.uid,
						messages: {
							0: {
								"body": "Hello World",
								"date": new Date().getTime(),
								"from": "admin@flashmail.com",
								"subject": "About service usage"
							}
						}
					});
					messagesRef.resolve($firebase(userDir.child('messages')));
				} else {
					// user is logged out
					console.log("User logout");
				}
			});

			return {
				getInboxName: function() {
					return text;
				},
				getMessages: function() {
					return messagesRef.promise;
				}
			};
		}
	]);
