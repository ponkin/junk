'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('junkMailApp.services', ['firebase'])
  .value('version', '0.1')

  .factory('FirebaseService', [ '$firebase', function($firebase) {
    var inboxesRef = new Firebase('https://sweltering-fire-2054.firebaseio.com/inboxes');
    var newInboxRef = inboxesRef.push();
  
    newInboxRef.onDisconnect().remove();
    newInboxRef.set({
  	  meta: Math.round(Math.random()*101)
    });
  
    var messagesRef = newInboxRef.child('messages');
	
	var now = new Date();
	
  
    messagesRef.set({
  	  '0' :{
  	  		from: 'admin@flashmail.com',
			subject: 'About service usage',
			date: now.getTime(),
  	  		body: 'Hello World'
  		}
    });  
	
	return {
		getFirebase: function(){
			return $firebase(messagesRef);
		},
		getInboxURL: function(){
			return newInboxRef.toString();
		}
	};
  

    } ]
	
);