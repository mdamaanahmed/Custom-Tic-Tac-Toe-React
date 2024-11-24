const winningMatch = 3;

export const generateGameColumns = (cols = 3) => {
  return Array(cols * cols).fill(null);
};

export const checkWinner = (board, size = 3) => {
  const checkDirection = (start, step, length) => {
    let count = 1;
    for (let i = 1; i < length; i++) {
      let prev = board[start + step * (i - 1)];
      let curr = board[start + step * i];
      if (curr !== null && curr === prev) {
        count++;
        if (count === winningMatch) return curr;
      } else {
        count = 1;
      }
    }
    return null;
  };

  // Check rows
  for (let row = 0; row < size; row++) {
    let winner = checkDirection(row * size, 1, size);
    if (winner) return winner;
  }

  // Check columns
  for (let col = 0; col < size; col++) {
    let winner = checkDirection(col, size, size);
    if (winner) return winner;
  }

  // Check diagonals from top-left to bottom-right
  for (let row = 0; row <= size - winningMatch; row++) {
    for (let col = 0; col <= size - winningMatch; col++) {
      let count = 1;
      for (let offset = 1; offset < winningMatch; offset++) {
        let prev = board[(row + offset - 1) * size + (col + offset - 1)];
        let curr = board[(row + offset) * size + (col + offset)];
        if (curr !== null && curr === prev) {
          count++;
          if (count === winningMatch) return curr;
        } else {
          count = 1;
          break;
        }
      }
    }
  }

  // Check diagonals from top-right to bottom-left
  for (let row = 0; row <= size - winningMatch; row++) {
    for (let col = winningMatch - 1; col < size; col++) {
      let count = 1;
      for (let offset = 1; offset < winningMatch; offset++) {
        let prev = board[(row + offset - 1) * size + (col - offset + 1)];
        let curr = board[(row + offset) * size + (col - offset)];
        if (curr !== null && curr === prev) {
          count++;
          if (count === winningMatch) return curr;
        } else {
          count = 1;
          break;
        }
      }
    }
  }

  return null;
};
