'use strict';

describe('Controller: LandingCtrl', function() {

  var $scope;

  beforeEach(function() {
    module('ilmomasiina');

    inject(function($injector) {
      var $controller = $injector.get('$controller'),
          $rootScope = $injector.get('$rootScope');

      $scope = $rootScope.$new();

      $controller('LandingCtrl', { $scope: $scope });
    });
  });

  it('has correct initial state', function() {
    expect($scope.hello).toBe('Hello World!');
  });

});
