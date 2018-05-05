function solve(){
  var solDiv = document.getElementById("solution");
  solDiv.innerHTML = "<strong>Solving ...</strong>\n";
  var puzzleText = readPuzzle();
  if (!puzzleText || puzzleText.length < 81){
    alert("Invalid Puzzle!!");
    return;
  }
  var st = new Date();
  var sol = search(parse_grid(puzzleText));
  //var sol = parse_grid(puzzleText);
  var et = new Date();
  if (!sol){
    alert("No solution found!!\n *** Input may be invalid ***");
    return;
  }
  solDiv.innerHTML = "<strong>Solution!</strong><br><pre>" + board_string(sol) + "</pre>\n";
}
function pick(){
  resetPuzzle();
  var pickIndex = (Math.floor(Math.random()*puzzles.length)%puzzles.length);
  setPuzzle(puzzles[pickIndex]);
  var solDiv = document.getElementById("solution");
  solDiv.innerHTML = "";
}
function setPuzzle(puzzleText){
  var digIndex = 0;
  for (var r in rows){
    for (var c in cols){
      var id = rows[r] + cols[c];
      var dig = puzzleText.charAt(digIndex++);
      if (digits.indexOf(dig) != -1){
        var inpElem = document.getElementById(id);
        inpElem.value = dig;
      }
    }
  }
}
function resetPuzzle(){
  for (var r in rows){
    for (var c in cols){
      var id = rows[r] + cols[c];
      var inpElem = document.getElementById(id);
      inpElem.value = "";
    }
  }
}
function readPuzzle(){
  var puzzleText = "";
  for (var r in rows){
    for (var c in cols){
      var id = rows[r] + cols[c];
      var inpElem = document.getElementById(id);
      puzzleText += (inpElem.value == "" ? "." : inpElem.value);
    }
  }
  return puzzleText;
}
function drawPuzzle(){
  document.write('<table style="background-color:black;">');
  for (var R = 0; R < 3; R++){
    document.write("<tr>\n");
    for (var C = 0; C < 3; C++){
      document.write("<td>");
      document.write('<table style="background-color:gray;">');
      for (var r = 0; r < 3; r++){
        document.write("<tr>\n");
        for (var c = 0; c < 3; c++){
          var id = rows[R*3 + r] + cols[C*3 + c];
          document.write('<td><input type="text" maxlength="1" size="1" id="' + id + '" value=""/></td>\n');
        }
        document.write("</tr>\n");
      }
      document.write('</table>');
      document.write("</td>");
    }
    document.write("</tr>\n");
  }
  document.write('</table>');
}