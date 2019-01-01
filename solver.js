function solve() {
  var puzzleText = readPuzzle();
  if (!puzzleText || puzzleText.length < 81) {
    alert("Invalid Puzzle!!");
    return;
  }

  for (key in squares) {
    var cell = document.getElementById(squares[key]);
    if (cell.value) cell.style.backgroundColor = "#b5b5b5";
  }
  var sol = search(parse_grid(puzzleText));

  // console.log(sol);
  if (!sol) {
    alert("No solution found!!\n *** Input may be invalid ***");
    return;
  }
  for (var key in sol) {
    // console.log(sol[cell]);
    var cell = document.getElementById(key);
    if (!cell.value) cell.value = sol[key];
  }
}

function parse_grid(grid) {
  // Given a string of 81 digits (or . or 0 or -), return an object os {cell:values}
  nassigns = 0;
  neliminations = 0;
  nsearches = 0;
  var grid2 = "";
  for (var c = 0; c < grid.length; c++)
    if ("0.-123456789".indexOf(grid.charAt(c)) >= 0) grid2 += grid.charAt(c);
  var values = {};
  for (var s in squares) values[squares[s]] = digits;
  for (var s in squares)
    if (
      digits.indexOf(grid2.charAt(s)) >= 0 &&
      !assign(values, squares[s], grid2.charAt(s))
    )
      return false;
  console.log(values);
  return values;
}

function assign(values, sq, dig) {
  // Eliminate all the other values (except dig)
  ++nassigns;
  var result = true;
  var vals = values[sq];
  for (var d = 0; d < vals.length; d++)
    if (vals.charAt(d) != dig)
      result &= eliminate(values, sq, vals.charAt(d)) ? true : false;
  return result ? values : false;
}

function eliminate(values, sq, dig) {
  ++neliminations;
  if (values[sq].indexOf(dig) == -1)
    // already eliminated.
    return values;
  values[sq] = values[sq].replace(dig, "");
  if (values[sq].length == 0)
    // invalid input ?
    return false;
  else if (values[sq].length == 1) {
    // If there is only one value (values[sq]) left in square, remove it from peers
    var result = true;
    for (var s in peers[sq])
      result &= eliminate(values, s, values[sq]) ? true : false;
    if (!result) return false;
  }
  for (var u in units[sq]) {
    var dplaces = [];
    for (var s in units[sq][u]) {
      var sq2 = units[sq][u][s];
      if (values[sq2].indexOf(dig) != -1) dplaces.push(sq2);
    }
    if (dplaces.length == 0) return false;
    else if (dplaces.length == 1)
      if (!assign(values, dplaces[0], dig)) return false;
  }
  return values;
}

function dup(obj) {
  var d = {};
  for (var f in obj) d[f] = obj[f];
  return d;
}

function search(values) {
  ++nsearches;
  if (!values) return false;
  var min = 10,
    max = 1,
    sq = null;
  for (var s in squares) {
    if (values[squares[s]].length > max) max = values[squares[s]].length;
    if (values[squares[s]].length > 1 && values[squares[s]].length < min) {
      min = values[squares[s]].length;
      sq = squares[s];
    }
  }

  if (max == 1) return values;
  for (var d = 0; d < values[sq].length; d++) {
    var res = search(assign(dup(values), sq, values[sq].charAt(d)));
    if (res) return res;
  }
  return false;
}

function center(s, w) {
  var excess = w - s.length;
  while (excess > 0) {
    if (excess % 2) s += " ";
    else s = " " + s;
    excess -= 1;
  }
  return s;
}
