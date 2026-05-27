import { reactive, ref, computed } from "vue";
import type { Board, Player, Position } from "../types/game";
import { BOARD_SIZE } from "../types/game";

function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => null),
  );
}

const DIRECTIONS: [number, number][] = [
  [0, 1], // horizontal
  [1, 0], // vertical
  [1, 1], // diagonal \
  [1, -1], // diagonal /
];

export function useGomoku() {
  const board = reactive<Board>(createEmptyBoard());
  const currentPlayer = ref<Player>("black");
  const winner = ref<Player | null>(null);
  const isDraw = ref(false);
  const history = reactive<Position[]>([]);
  const lastMove = ref<Position | null>(null);

  const gameOver = computed(() => winner.value !== null || isDraw.value);

  function placePiece(row: number, col: number): boolean {
    if (gameOver.value) return false;
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE)
      return false;
    if (board[row][col] !== null) return false;

    board[row][col] = currentPlayer.value;
    history.push({ row, col });
    lastMove.value = { row, col };

    if (checkWin(row, col, currentPlayer.value)) {
      winner.value = currentPlayer.value;
      return true;
    }

    if (history.length === BOARD_SIZE * BOARD_SIZE) {
      isDraw.value = true;
      return true;
    }

    currentPlayer.value = currentPlayer.value === "black" ? "white" : "black";
    return true;
  }

  function checkWin(row: number, col: number, player: Player): boolean {
    for (const [dr, dc] of DIRECTIONS) {
      let count = 1;

      // count in positive direction
      for (let i = 1; i < 5; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        if (
          r >= 0 &&
          r < BOARD_SIZE &&
          c >= 0 &&
          c < BOARD_SIZE &&
          board[r][c] === player
        ) {
          count++;
        } else {
          break;
        }
      }

      // count in negative direction
      for (let i = 1; i < 5; i++) {
        const r = row - dr * i;
        const c = col - dc * i;
        if (
          r >= 0 &&
          r < BOARD_SIZE &&
          c >= 0 &&
          c < BOARD_SIZE &&
          board[r][c] === player
        ) {
          count++;
        } else {
          break;
        }
      }

      if (count >= 5) return true;
    }

    return false;
  }

  function undo(): boolean {
    if (history.length === 0) return false;

    const last = history.pop()!;
    const undonePlayer = board[last.row][last.col]!;
    board[last.row][last.col] = null;

    currentPlayer.value = undonePlayer;

    if (winner.value) {
      winner.value = null;
    }
    if (isDraw.value) {
      isDraw.value = false;
    }

    lastMove.value = history.length > 0 ? history[history.length - 1] : null;
    return true;
  }

  function reset(): void {
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        board[r][c] = null;
      }
    }
    currentPlayer.value = "black";
    winner.value = null;
    isDraw.value = false;
    history.length = 0;
    lastMove.value = null;
  }

  function getWinLine(): Position[] | null {
    if (!winner.value || !lastMove.value) return null;

    const { row, col } = lastMove.value;
    const player = winner.value;

    for (const [dr, dc] of DIRECTIONS) {
      const line: Position[] = [{ row, col }];

      for (let i = 1; i < 5; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        if (
          r >= 0 &&
          r < BOARD_SIZE &&
          c >= 0 &&
          c < BOARD_SIZE &&
          board[r][c] === player
        ) {
          line.push({ row: r, col: c });
        } else {
          break;
        }
      }

      for (let i = 1; i < 5; i++) {
        const r = row - dr * i;
        const c = col - dc * i;
        if (
          r >= 0 &&
          r < BOARD_SIZE &&
          c >= 0 &&
          c < BOARD_SIZE &&
          board[r][c] === player
        ) {
          line.unshift({ row: r, col: c });
        } else {
          break;
        }
      }

      if (line.length >= 5) return line;
    }

    return null;
  }

  return {
    board,
    currentPlayer,
    winner,
    isDraw,
    history,
    lastMove,
    gameOver,
    placePiece,
    undo,
    reset,
    getWinLine,
  };
}
