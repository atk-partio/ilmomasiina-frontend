'use strict';

angular.module('ilmomasiina.controllers', []);
angular.module('ilmomasiina.services', []);
angular.module('ilmomasiina.directives', []);

angular.module('ilmomasiina', ['ngRoute', 'ilmomasiina.controllers', 'ilmomasiina.services', 'ilmomasiina.directives'])
  .config(['$routeProvider', function($routeProvider) {

    $routeProvider
      .when('/', {
        controller: 'LandingCtrl',
        templateUrl: 'templates/controllers/landing.html'
      });

  }]);
