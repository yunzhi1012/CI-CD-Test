<template>
  <div class="app">
    <h1 class="app__title">
      五子棋1
    </h1>
    <GameStatus
      :current-player="currentPlayer"
      :winner="winner"
      :is-draw="isDraw"
      :history="history"
      @undo="undo"
      @reset="reset"
    />
    <GomokuBoard
      :board="board"
      :current-player="currentPlayer"
      :game-over="gameOver"
      :last-move="lastMove"
      :win-line="winLine"
      @place="handlePlace"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GomokuBoard from './components/GomokuBoard.vue'
import GameStatus from './components/GameStatus.vue'
import { useGomoku } from './composables/useGomoku'

const {
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
} = useGomoku()

const winLine = computed(() => getWinLine())

function handlePlace(row: number, col: number) {
  placePiece(row, col)
}
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  &__title {
    font-size: 32px;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 20px;
    letter-spacing: 6px;
  }
}
</style>
