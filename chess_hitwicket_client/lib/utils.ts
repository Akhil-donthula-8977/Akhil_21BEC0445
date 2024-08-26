import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { firstSelectBoardInitialState } from "@/constants/GameConstants";
import { diagonals, oneDirection } from "@/constants/GameConstants";

export interface MakeMoveParams {
  board: any[][];
  setStateOfBoard: Function,
  firstSelect: [number, number];
  player: string;
  buttonSet: string[];
  position: string
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function boardToStringSerializer() {

}

export function containsH1(value: string | null): boolean {
  return value !== null && value.includes("h1");
}
export function containsH2(value: string | null): boolean {
  return value !== null && value.includes("h2");
}
export function containsP(value: string | null): boolean {
  return value !== null && value.includes("p");
}


export function showAllowablePositionsColor(
  boardFirstSelectColor: boolean[][],
  setBoardFirstSelectColor: Function,
  board: string[][],
  row: number,
  col: number,
  player: string
) {
  const temp = firstSelectBoardInitialState.map((row) => [...row]);
  const isValidMove = (newRow: number, newCol: number) => {
    return (
      newRow >= 0 &&
      newRow < board.length &&
      newCol >= 0 &&
      newCol < board[0].length &&
      (board[newRow][newCol] == null || board[newRow][newCol][0] != player)
    );
  };

  const processMovements = (movements: number[][], steps: number) => {
    for (const mov of movements) {
      for (let i = 0; i < steps; i++) {
        const newRow = row + mov[0] * (i + 1);
        const newCol = col + mov[1] * (i + 1);
        if (isValidMove(newRow, newCol)) {
          temp[newRow][newCol] = true;
        }
      }
    }
  };
  if (containsH2(board[row][col])) {
    processMovements(diagonals, 2);
  } else if (containsP(board[row][col])) {
    processMovements(oneDirection, 1);
  }
  else if (containsH1(board[row][col])) {
    processMovements(oneDirection, 2);
  }
  setBoardFirstSelectColor([...temp]);
}

export function makeMove({
  board,
  setStateOfBoard,
  firstSelect,
  player,
  buttonSet,
  position
}: MakeMoveParams) {
  const row = firstSelect[0];
  const col = firstSelect[1];

  const isValidMove = (newRow: number, newCol: number) => {
    return (
      newRow >= 0 &&
      newRow < board.length &&
      newCol >= 0 &&
      newCol < board[0].length &&
      (board[newRow][newCol] == null || board[newRow][newCol][0] !== player)
    );
  };

  const processMovements = (mov: number[], steps: number, row: number, col: number): [boolean, number, number] => {
    let isOk = true;
    let updatedIndex: [number, number] = [0, 0];
    for (let i = 0; i < steps; i++) {
      const newRow = row + mov[0] * (i + 1);
      const newCol = col + mov[1] * (i + 1);
      updatedIndex = [newRow, newCol];
      if (!isValidMove(newRow, newCol)) {
        isOk = false;
        break;
      }
    }
    return [isOk, ...updatedIndex];
  };

  const updateBoard = (newRow: number, newCol: number) => {
    const newBoard = board.map(row => row.slice());
    const temp = newBoard[firstSelect[0]][firstSelect[1]];
    newBoard[newRow][newCol] = temp;
    newBoard[firstSelect[0]][firstSelect[1]] = null;
    setStateOfBoard(newBoard);
    return JSON.stringify(newBoard);
  };

  if (containsH1(board[row][col])) {
    //@ts-ignore
    const [isValid, nr, nc] = processMovements(pawnMoments[position], 2, row, col);
    if (isValid) {
      var ans=updateBoard(nr, nc);
      return [true,ans];
    }
  } else if (containsH2(board[row][col])) {
     //@ts-ignore
    const [isValid, nr, nc] = processMovements(H2Moments[position], 2, row, col);
    if (isValid ) {
      var ans=updateBoard(nr, nc);
      return [true,ans];
    }
  } else if (containsP(board[row][col])) {
     //@ts-ignore
    const [isValid, nr, nc] = processMovements(pawnMoments[position], 1, row, col);
    if (isValid) {
      var ans=updateBoard(nr, nc);
      return [true,ans];
    }
  }

  return [false,JSON.stringify(board)];
}


type PawnMoveDirection = "L" | "R" | "F" | "B";



const pawnMoments: Record<PawnMoveDirection, number[]> = {
  "L": [0, -1],
  "R": [0, 1],
  "F": [-1, 0],
  "B": [1, 0]
};

const H2Moments = {
  "FL": [-1, -1],
  "FR": [-1, 1],
  "BL": [1, -1],
  "BR": [1, 1]
}