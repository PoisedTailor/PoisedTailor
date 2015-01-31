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
  })
  .directive('draggableThing', function(){
    return {
      restrict: 'A',
      scope: {
        index: "=",
        parent: "="
      },
      link: function(scope, elem) {
        elem.bind('dragstart', function(e) {
          console.log("from", [scope.parent, scope.index]);
        });
      }
    };
  })
  .directive('droppableArea', function(){
    return {
      restrict: 'A',
      scope: {
        index: "=",
        parent: "="
      },
      link: function(scope, elem) {
        elem.bind('drop', function(e) {
          console.log("to", [scope.parent, scope.index]);
        });
      }
    };
  })
  .directive('disableOver', function() {
    return {
      restrict: 'A',
      link: function(scope, elem) {
        elem.bind('dragover', function(e) {
          e.preventDefault();
        });
      }
    };
  })
  .directive('disableEnter', function() {
    return {
      restrict: 'A',
      link: function(scope, elem) {
        elem.bind('dragenter', function(e) {
          e.preventDefault();
        });
      }
    };
  });
