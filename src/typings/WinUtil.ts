export class WinUtil {
  checkWin = (boardObj: any, turn: string) => {
    const { board } = boardObj;
    if (
      this.winByRow(board, turn) ||
      this.winByCol(board, turn) ||
      this.winByNegSlope(board, turn) ||
      this.winByPosSlope(board, turn)
    ) {
      return true;
    }
    return false;
  };

  winByCol = (board: any, turn: string) => {
    const numCols = board[0].length;
    let i = 0;
    while (i < numCols) {
      if (
        this.helper(
          board.map((_, j) => board[j][i]),
          turn
        )
      )
        return true;
      i++;
    }
    return false;
  };

  winByRow = (board: any, turn: string) => {
    const numRows = board.length;
    let i = 0;
    while (i < numRows) {
      if (this.helper(board[i], turn)) {
        return true;
      }
      i++;
    }
    return false;
  };

  winByPosSlope = (board: any, turn: string) => {
    for (let i = 0; i < board.length - 2; i++) {
      if (board[i + 3] !== undefined) {
        for (let j = 0; j < board[i].length; j++) {
          if (
            board[i][j] === turn &&
            board[i + 1][j - 1] === turn &&
            board[i + 2][j - 2] === turn &&
            board[i + 3][j - 3] === turn
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  winByNegSlope = (board: any, turn: string) => {
    for (let i = 0; i < board.length - 2; i++) {
      if (board[i + 3] !== undefined) {
        for (let j = 0; j < board[i].length; j++) {
          if (
            board[i][j] === turn &&
            board[i + 1][j + 1] === turn &&
            board[i + 2][j + 2] === turn &&
            board[i + 3][j + 3] === turn
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  helper = (array: [string | null], turn: string) => {
    let i = 0;
    while (i < array.length - 3) {
      if (
        array[i] === turn &&
        array[i + 1] === array[i] &&
        array[i + 2] === array[i + 1] &&
        array[i + 3] === array[i + 2]
      ) {
        return true;
      }
      i++;
    }
    return false;
  };
}
