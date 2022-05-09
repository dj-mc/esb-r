function fold_array(arr: Array<string>) {
  const folded = [];
  const dimension_length = Math.sqrt(arr.length);
  for (let i = 0; i < arr.length; i += dimension_length) {
    const sub_array = arr.slice(i, i + dimension_length);
    folded.push(sub_array);
  }
  return folded;
}

function calc_transpose(arr2d: string[][]) {
  return arr2d[0].map((_, i) => arr2d.map((row) => row[i]));
}

function calc_diagonals(arr2d: string[][]) {
  const diag_left_right = [];
  const diag_right_left = [];
  for (let i = arr2d.length, j = 0; i > 0; i--, j++) {
    diag_left_right.push(arr2d[j][j]);
    diag_right_left.push(arr2d[i - 1][j]);
  }
  return Array<Array<string>>(diag_left_right, diag_right_left);
}

function row_winner(row: Array<string | null>) {
  const set_row = new Set(row);
  if (row.includes(null) || set_row.size !== 1) {
    return null; // No winner
  }
  return set_row.values().next().value; // Winner
}

export default function winner(squares: Array<string>) {
  const folded = fold_array(squares); // Rows
  const transposed = calc_transpose(folded); // Columns
  const diagonals = calc_diagonals(folded); // Diagonals

  for (const row of folded) {
    const result = row_winner(row);
    if (result) {
      return result;
    }
  }

  for (const col of transposed) {
    const result = row_winner(col);
    if (result) {
      return result;
    }
  }

  for (const diag of diagonals) {
    const result = row_winner(diag);
    if (result) {
      return result;
    }
  }

  return null;
}
