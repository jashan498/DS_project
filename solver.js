function solve() {
  var solDiv = document.getElementById("solution");
  solDiv.innerHTML = "<strong>Solving ...</strong>\n";
  var puzzleText = readPuzzle();
  if (!puzzleText || puzzleText.length < 81) {
    alert("Invalid Puzzle!!");
    return;
  }

  var sol = search(parse_grid(puzzleText));

  if (!sol) {
    alert("No solution found!!\n *** Input may be invalid ***");
    return;
  }
  solDiv.innerHTML =
    "<strong>Solution!</strong><br><pre>" + board_string(sol) + "</pre>\n";
}

function pick() {
  resetPuzzle();
  var pickIndex = Math.floor(Math.random() * puzzles.length) % puzzles.length;
  setPuzzle(puzzles[pickIndex]);
  var solDiv = document.getElementById("solution");
  solDiv.innerHTML = "";
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
  console.log(rows, cols);
  for (var r in rows) {
    for (var c in cols) {
      var id = rows[r] + cols[c];
      var inpElem = document.getElementById(id);
      inpElem.value = "";
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
