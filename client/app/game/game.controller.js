'use strict';

angular.module('projectApp')
  .controller('GameCtrl', function ($scope) {
    var board = new Board();
    $scope.grid = board.get('state');
  });
