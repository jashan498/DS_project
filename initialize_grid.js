function cross(A, B) {
  var C = [];
  for (var a in A) for (var b in B) C.push(A[a] + B[b]);
  return C;
}

function member(item, list) {
  for (var i in list) if (item == list[i]) return true;
  return false;
}

var rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
var cols = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var digits = "123456789";
var squares = cross(rows, cols);
var nassigns = 0;
var neliminations = 0;
var nsearches = 0;

var unitlist = [];
for (var c in cols) unitlist.push(cross(rows, [cols[c]]));
for (var r in rows) unitlist.push(cross([rows[r]], cols));
var rrows = [["A", "B", "C"], ["D", "E", "F"], ["G", "H", "I"]];
var ccols = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]];
for (var rs in rrows)
  for (var cs in ccols) unitlist.push(cross(rrows[rs], ccols[cs]));

var units = {};
for (var s in squares) {
  units[squares[s]] = [];
  for (var u in unitlist)
    if (member(squares[s], unitlist[u])) units[squares[s]].push(unitlist[u]);
}

var peers = {};
for (var s in squares) {
  peers[squares[s]] = {};
  for (var u in units[squares[s]]) {
    var ul = units[squares[s]][u];
    for (var s2 in ul)
      if (ul[s2] != squares[s]) peers[squares[s]][ul[s2]] = true;
  }
}

function pick() {
  resetPuzzle();
  var pickIndex = Math.floor(Math.random() * puzzles.length) % puzzles.length;
  setPuzzle(puzzles[pickIndex]);
}

function setPuzzle(puzzleText) {
  var digIndex = 0;
  for (var r in rows) {
    for (var c in cols) {
      var id = rows[r] + cols[c];
      var dig = puzzleText.charAt(digIndex++);
      if (digits.indexOf(dig) != -1) {
        var inpElem = document.getElementById(id);
        inpElem.value = dig;
        inpElem.style.backgroundColor = "#b5b5b5";
      }
    }
  }
}

function resetPuzzle() {
  // console.log(rows, cols);
  for (var r in rows) {
    for (var c in cols) {
      var id = rows[r] + cols[c];
      var inpElem = document.getElementById(id);
      inpElem.value = "";
      inpElem.style.backgroundColor = "white";
    }
  }
}

function readPuzzle() {
  var puzzleText = "";
  for (var r in rows) {
    for (var c in cols) {
      var id = rows[r] + cols[c];
      var inpElem = document.getElementById(id);
      puzzleText += inpElem.value == "" ? "." : inpElem.value;
    }
  }
  return puzzleText;
}

function drawPuzzle() {
  document.write('<section class="sudoku">');
  for (var R = 0; R < 3; R++) {
    document.write('<div class="sudoku-row">');
    for (var C = 0; C < 3; C++) {
      document.write('<div class="sudoku-square">');
      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
          var id = rows[R * 3 + r] + cols[C * 3 + c];
          var i = 3 * r + c + 1;
          document.write(
            '<div class="cell"><span class="label">' +
              i +
              '</span><input type="text" maxlength="1" size="1" class="cell-value" id="' +
              id +
              '" value=""/></div>'
          );
        }
      }
      document.write("</div>");
    }
    document.write("</div>");
  }
  document.write("</section>");
}
