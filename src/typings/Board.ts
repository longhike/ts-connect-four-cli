import { table } from "table";
import { TableConfig } from "./";

export type TBoard = Array<Array<string | null>>;
export type THeader = Array<Array<string>>;
export class Board {
  readonly col: number;
  readonly row: number;
  public board: TBoard;
  public header: THeader;
  constructor(col: number, row: number) {
    this.col = col;
    this.row = row;
    this.header = [["1", "2", "3", "4", "5", "6", "7"]];
    this.board = this.makeAndSetBoard();
  }

  makeAndSetBoard = () => {
    const newBoard = new Array(this.col);
    for (let i = 0; i < newBoard.length; i++) {
      const newRow = [];
      for (let j = 0; j < this.row; j++) {
        newRow.push(null);
      }
      newBoard[i] = newRow;
    }
    return newBoard;
  };

  showBoard = () => {
    console.log(table(this.header, TableConfig));
    console.log(table(this.board, TableConfig));
  };

  makeMove = (turn: string, col: number): boolean => {
    for (let i = this.board.length - 1; i >= 0; i--) {
      if (this.board[i][col - 1] === null) {
        this.board[i][col - 1] = turn;
        return true;
      }
    }
    return false;
  };
}
