'use strict';

angular.module('projectApp')
  .controller('GameCtrl', function ($scope) {
    $scope.cellsToSwap = [];

    var board = new Board();
    $scope.grid = board.get('state');

    $scope.getCell = function(row, col) {
      $scope.cellsToSwap.push([row, col]);
      if ($scope.cellsToSwap.length === 2) {
        $scope.swap();
      }
    };

    $scope.swap = function() {
      var isValid = board.isValidSwap(
        $scope.cellsToSwap[0],
        $scope.cellsToSwap[1]
      );
      if(isValid) {
        board.swap($scope.cellsToSwap[0],
        $scope.cellsToSwap[1]);
        $scope.cellsToSwap = [];
      } else {
        alert("Can't swap that pair! Try again.");
        $scope.cellsToSwap = [];
      }
    };
  });
