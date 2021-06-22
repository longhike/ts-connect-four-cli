import chalk from "chalk";
import inquirer, { PromptModule } from "inquirer";
import { Board, WinUtil, TBoard } from "./";

export class Game {
  private board: Board;
  private turn: string;
  private prompt: PromptModule;
  public readonly invalidEntryMessage: string;
  public readonly invalidMoveMessage: string;
  public readonly quitMessage: string;
  checkWin: Function;
  constructor() {
    this.board = new Board(6, 7);
    this.turn = "red";
    this.prompt = inquirer.prompt;
    this.checkWin = (new WinUtil).checkWin
    this.invalidEntryMessage =
      "This is not a valid entry. Use a number from 1 - 7.";
    this.invalidMoveMessage =
      "This is not a valid move, that column is filled. Select another column.";
    this.quitMessage = chalk.blue.bold("Thanks for playing!")
  }

  doTurn = async () => {
    this.board.showBoard();
    const response = await this.prompt([
      {
        name: "move",
        message: `It's ${this.turn}'s turn: enter the column in which you'd like to play (1 - 7), enter "q" to quit): `,
      },
    ]);
    if (response.move === "q") {
      this.quit()
    }
    const move: number = parseInt(response.move);
    if (isNaN(move) || move < 1 || move > 7) {
      this.invalid("entry");
    } else {
      const attempt: boolean = this.board.makeMove(this.turn, move);
      if (!attempt) {
        this.invalid("move");
      } else {
        if (!this.checkWin(this.board,this.turn)) {
          this.switchTurn()
          this.doTurn()
        }
        else {
          this.board.showBoard()
          console.log(
            chalk.magenta.bold(
              `CONGRATS ${this.turn.toUpperCase()} - YOU WON!!!!!!`
            )
          );
          this.continuePlaying()
        }

      }
    }
  };

  switchTurn = () => {
    if (this.turn === "red") this.turn = "black";
    else this.turn = "red";
  };

  invalid = (type: string) => {
    switch (type) {
      case "entry":
        console.error(chalk.red.bold(this.invalidEntryMessage));
        return this.doTurn();
      case "move":
        console.error(chalk.red.bold(this.invalidMoveMessage));
        return this.doTurn();
      default:
        return;
    }
  };

  start = () => {
    this.board = new Board(6, 7);
    this.turn = "red";
    this.doTurn()
  }

  continuePlaying = async () => {
    const response = await this.prompt([
      {
        name: "continue",
        message: `To continue playing, enter "y"; enter any other key to quit: `,
      },
    ]);
    const cont = response.continue.toLowerCase()
    if (cont === "y") {
      this.start()
    }
    else {
      this.quit()
    }
  }

  quit = () => {
    console.log(this.quitMessage)
    process.exit(0)
  }
}
