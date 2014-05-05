'use strict';


angular.module('junkMailApp', [
  'ngRoute',
  'ui.bootstrap',
  'junkMailApp.filters',
  'junkMailApp.services',
  'junkMailApp.directives',
  'junkMailApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/inbox', {templateUrl: 'partials/inbox.html', controller: 'InboxCtrl'});
  $routeProvider.when('/messages/:messageId', {templateUrl: 'partials/message.html', controller: 'MessageCtrl'});
  $routeProvider.otherwise({redirectTo: '/inbox'});
}]);