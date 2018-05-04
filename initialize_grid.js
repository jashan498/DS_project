function cross(A, B){
  var C = [];
  for (var a in A) 
    for (var b in B) 
      C.push(A[a] + B[b]);
  return C;
}

function member(item, list){
  for (var i in list)
    if (item == list[i]) return true;
  return false;
}

var rows = ['A','B','C','D','E','F','G','H','I'];
var cols = ['1','2','3','4','5','6','7','8','9'];
var digits = "123456789";
var squares = cross(rows, cols);
var nassigns = 0;
var neliminations = 0;
var nsearches = 0;

var unitlist = [];
for (var c in cols) 
  unitlist.push(cross(rows, [cols[c]]));
for (var r in rows) 
  unitlist.push(cross([rows[r]], cols));
var rrows = [['A','B','C'], ['D','E','F'], ['G','H','I']];
var ccols = [['1','2','3'], ['4','5','6'], ['7','8','9']];
for (var rs in rrows) 
  for (var cs in ccols) 
    unitlist.push(cross(rrows[rs], ccols[cs]));

var units = {};
for (var s in squares){
  units[squares[s]] = [];
  for (var u in unitlist)
    if (member(squares[s], unitlist[u]))
      units[squares[s]].push(unitlist[u]);
}

var peers = {};
for (var s in squares){
  peers[squares[s]] = {};
  for (var u in units[squares[s]]){
    var ul = units[squares[s]][u];
    for (var s2 in ul)
      if (ul[s2] != squares[s])
        peers[squares[s]][ul[s2]] = true;
  }
}

function parse_grid(grid){ // Given a string of 81 digits (or . or 0 or -), return an object os {cell:values}
  nassigns = 0;
  neliminations = 0;
  nsearches = 0;
  var grid2 = "";
  for (var c = 0; c < grid.length; c++)
    if ("0.-123456789".indexOf(grid.charAt(c)) >= 0)
      grid2 += grid.charAt(c);
  var values = {};
  for (var s in squares)
    values[squares[s]] = digits;
  for (var s in squares)
    if (digits.indexOf(grid2.charAt(s)) >= 0 && !assign(values, squares[s], grid2.charAt(s)))
      return false;
  return values;
}