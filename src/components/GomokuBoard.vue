<template>
  <div class="board-wrapper">
    <div class="board">
      <div class="board__grid">
        <GomokuCell
          v-for="(cell, idx) in flatBoard"
          :key="idx"
          :cell="cell.value"
          :row="cell.row"
          :col="cell.col"
          :is-last-move="isLastMove(cell.row, cell.col)"
          :is-win-cell="isWinCell(cell.row, cell.col)"
          :game-over="gameOver"
          :preview-player="currentPlayer"
          :is-star-point="isStarPoint(cell.row, cell.col)"
          @place="handlePlace(cell.row, cell.col)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GomokuCell from './GomokuCell.vue'
import type { Board, Position } from '../types/game'
import { BOARD_SIZE } from '../types/game'

const props = defineProps<{
  board: Board
  currentPlayer: 'black' | 'white'
  gameOver: boolean
  lastMove: Position | null
  winLine: Position[] | null
}>()

const emit = defineEmits<{
  place: [row: number, col: number]
}>()

const flatBoard = computed(() => {
  const cells: { row: number; col: number; value: typeof props.board[0][0] }[] = []
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      cells.push({ row: r, col: c, value: props.board[r][c] })
    }
  }
  return cells
})

const starPoints = computed(() => {
  const set = new Set<string>()
  if (BOARD_SIZE === 15) {
    for (const r of [3, 7, 11]) {
      for (const c of [3, 7, 11]) {
        set.add(`${r},${c}`)
      }
    }
  }
  return set
})

function isStarPoint(row: number, col: number): boolean {
  return starPoints.value.has(`${row},${col}`)
}

function handlePlace(row: number, col: number) {
  emit('place', row, col)
}

function isLastMove(row: number, col: number): boolean {
  if (!props.lastMove) return false
  return props.lastMove.row === row && props.lastMove.col === col
}

function isWinCell(row: number, col: number): boolean {
  if (!props.winLine) return false
  return props.winLine.some(p => p.row === row && p.col === col)
}
</script>

<style lang="scss" scoped>
.board-wrapper {
  display: flex;
  justify-content: center;
}

.board {
  width: min(600px, 85vw);
  height: min(600px, 85vw);
  background: #deb887;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  padding: 3%;

  &__grid {
    display: grid;
    grid-template-columns: repeat(15, 1fr);
    grid-template-rows: repeat(15, 1fr);
    width: 100%;
    height: 100%;
  }
}
</style>
