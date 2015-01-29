'use strict';

angular.module('projectApp')
  .controller('GameCtrl', function ($scope) {
    var board = new Board();
    $scope.grid = board.get('state');
    var sq1 = [3,4];
    var sq2 = [5,5];
    var isValid = board.isValidSwap(sq1, sq2);   
  });
