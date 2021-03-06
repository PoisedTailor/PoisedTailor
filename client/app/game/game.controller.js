'use strict';

angular.module('projectApp')
  .controller('GameCtrl', function ($scope) {
    $scope.cellsToSwap = [];
    $scope.score = 0;
    $scope.rows = 12;
    $scope.cols = 6;
    var board = new Board();
    $scope.grid = board.get('state');

    $scope.getCell = function(row, col) {
      $scope.cellsToSwap.push([row, col]);
      if ($scope.cellsToSwap.length === 2) {
        $scope.swap();
      }
    };

    $scope.createBoard = function() {
      board = new Board($scope.rows, $scope.cols);
      $scope.grid = board.get('state');
    };

    $scope.swap = function() {
      var isValid = board.isValidSwap(
        $scope.cellsToSwap[0],
        $scope.cellsToSwap[1]
      );
      if(isValid) {
        var updatedBoard = board.swap($scope.cellsToSwap[0],
        $scope.cellsToSwap[1]);
        $scope.cellsToSwap = [];
        $scope.score = updatedBoard.score;
        console.log("updatedBoard:", updatedBoard);
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
        callback: "&getIndices"
      },
      link: function(scope, elem) {
        elem.bind('dragstart', function(e) {
          scope.$apply(function(){
            elem.addClass('drag');
            scope.callback();
          });
        });
        elem.bind('dragend', function(e) {
          scope.$apply(function(){
            elem.removeClass('drag');
          });
        });
      }
    };
  })
  .directive('droppableArea', function(){
    return {
      restrict: 'A',
      scope: {
        callback: "&getIndices"
      },
      link: function(scope, elem) {
        elem.bind('drop', function(e) {
          scope.$apply(function(){
            scope.callback();
          });
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
