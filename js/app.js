'use strict';


angular.module('junkMailApp', [
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'junkMailApp.filters',
  'junkMailApp.services',
  'junkMailApp.directives',
  'junkMailApp.controllers',
  'ngClipboard',
]).
config(['$routeProvider', 'ngClipProvider', function($routeProvider, ngClipProvider) {
  $routeProvider.when('/inbox', {templateUrl: 'partials/inbox.html', controller: 'InboxCtrl'});
  $routeProvider.when('/messages/:messageId', {templateUrl: 'partials/message.html', controller: 'MessageCtrl'});
  $routeProvider.otherwise({redirectTo: '/inbox'});
  ngClipProvider.setPath("js/ZeroClipboard.swf");
}]);