var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

describe('Game Logic testing', function() {

  var testboard;

  var testMatrixforEach = function(matrix, cb) {
    for (var m = 0; m < matrix.length; m++){
      for (var n = 0; n < matrix[0].length; n++){
        cb(matrix[m][n], m, n, matrix);
      }
    }
  }

  var testMatrixContains = function(matrix, cb){
    for (var m = 0; m < matrix.length; m++){
      for (var n = 0; n < matrix[0].length; n++){
        if (cb(matrix[m][n], m, n, matrix) === true) return true;
      }
    }
    return false;
  }

  var testContainsMatch = function(element, m, n, matrix) {
    if (m > 0){
      if (element + matrix[m-1][n] === testboard.target) return true;
    }
    if (m < matrix.length-1){
      if (element + matrix[m+1][n] === testboard.target) return true;
    }
    if (n > 0){
      if (element + matrix[m][n-1] === testboard.target) return true;
    }
    if (n < matrix[0].length-1){
      if (element + matrix[m][n+1] === testboard.target) return true;
    }
    return false;
  }

  var testSwappable = function(element, m, n, matrix) {
    if (m > 1){
      if (element + matrix[m-2][n] === testboard.target) return true;
    }
    if (m > 0 && n > 0){
      if (element + matrix[m-1][n-1] === testboard.target) return true;
    }
    if (m < matrix.length-2){
      if (element + matrix[m+2][n] === testboard.target) return true;
    }
    if (m < matrix.length-1 && n > 0){
      if (element + matrix[m+1][n-1] === testboard.target) return true;
    }
    if (n > 1){
      if (element + matrix[m][n-2] === testboard.target) return true;
    }
    if (m > 0 && n < matrix[0].length-1){
      if (element + matrix[m-1][n+1] === testboard.target) return true;
    }
    if (n < matrix[0].length-2){
      if (element + matrix[m][n+2] === testboard.target) return true;
    }
    if (m < matrix.length-1 && n < matrix[0].length-1){
      if (element + matrix[m+1][n+1] === testboard.target) return true;
    }
    return false;
  }

  beforeEach(function() {
    testboard = new Board();
  });

  xdescribe("Board Creation testing", function() {
    it("should be able to create a new board", function() {
      expect(testboard.state).to.have.length.above(0);
    });

    it("new board should have default values set", function() {
      expect(testboard.rows).to.equal(12);
      expect(testboard.cols).to.equal(6);
      expect(testboard.op).to.not.be.undefined;
      expect(testboard.difficulty).to.equal(1);
      expect(testboard.target).to.be.above(0);
    });

    it("should be able to create board of m rows by n columns", function() {
      testboard = new Board(3, 2);
      expect(testboard.state.length).to.equal(3);
      expect(testboard.state[0].length).to.equal(2);
      testboard = new Board(20, 10);
      expect(testboard.state.length).to.equal(20);
      expect(testboard.state[0].length).to.equal(10);
    });

    it("create should create new board with new values", function() {
      testboard2 = new Board();
      expect(testboard.state[0]).not.to.equal(testboard2.state[0]);
    });
    
    it("should create new board with no matches to target", function() {
      expect(testMatrixContains(testboard.board,testContainsMatch)).to.equal(false);
    });

    it("should create new board with swappable matches", function() {
      expect(testMatrixContains(testboard.board,testSwappable)).to.equal(true);
    });  
  });
  
  xdescribe("Swap testing", function(){
    it("isValidSwap should return true for valid swap", function() {
      testboard = new Board(2, 4);
      testboard.board = [[1,0,1,0],[0,0,0,0]];
      testboard.target = 2;
      expect(testboard.isValidSwap([0,0],[0,1])).to.equal(true);
      expect(testboard.isValidSwap([0,2],[0,1])).to.equal(true);
    });

    it("isValidSwap should return false for invalid swaps", function() {
      testboard = new Board(2, 4);
      testboard.board = [[1,0,1,0],[0,0,0,0]];
      testboard.target = 2;
      expect(testboard.isValidSwap([1,0],[1,1])).to.equal(false);
      expect(testboard.isValidSwap([1,0],[1,2])).to.equal(false);
      expect(testboard.isValidSwap([0,3],[0,4])).to.equal(false);
    });

    it("should throw error on swapping out-of-bounds", function() {
      testboard = new Board(2, 4);
      testboard.board = [[1,0,1,0],[0,0,0,0]];
      testboard.target = 2;
      expect(testboard.swap.bind(this,[0,3],[0,4])).to.throw(Error);
    });

    it("should throw error on swapping non-neighbors", function() {
      testboard = new Board(2, 4);
      testboard.board = [[1,0,1,0],[0,0,0,0]];
      testboard.target = 2;
      expect(testboard.swap.bind(this,[0,0],[0,2])).to.throw(Error);
    });

    it("should swap and match neighbors", function() {
      testboard = new Board(2, 4);
      testboard.board = [[1,0,1,0],[0,0,0,0]];
      testboard.target = 2;
      testboard.swap([0,0],[0,1]);
      console.log(testboard.get('board'));
      console.log('target = ', testboard.target);
      expect(testMatrixContains(testboard.board,testContainsMatch)).to.equal(false);
      expect(testMatrixContains(testboard.board,testSwappable)).to.equal(true);
    });
  });

});
