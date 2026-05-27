export type Player = 'black' | 'white'

export type CellState = Player | null

export type Board = CellState[][]

export interface Position {
  row: number
  col: number
}

export interface GameState {
  board: Board
  currentPlayer: Player
  winner: Player | null
  history: Position[]
  isDraw: boolean
}

export const BOARD_SIZE = 15
