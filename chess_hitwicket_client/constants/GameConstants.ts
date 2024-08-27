export const startboard = [
    ["A-p1", "A-p2", "A-h1", "A-h2", "A-p3"],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    ["B-p1", "B-p2", "B-h1", "B-h2", "B-p3"]
];
export const firstSelectBoardInitialState = [
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false]
];
export const rows = 5;
export const cols = 5;
export const h2buttonName=["FL","FR","BL","BR"]
export const remainingButton=["L","R","F","B"]
export var initialBoardState = Array(rows).fill(null).map(() => Array(cols).fill(null));
export const diagonals:number[][]=[[-1, 1], [-1, -1], [1, -1], [1, 1]]
export const oneDirection:number[][]=[[0, 1], [0, -1], [1, 0], [-1, 0]]