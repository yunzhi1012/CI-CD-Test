<template>
  <div
    class="cell"
    :class="{
      'cell--occupied': cell !== null,
      'cell--last': isLastMove,
      'cell--win': isWinCell,
      'cell--right-edge': col === 14,
      'cell--bottom-edge': row === 14,
    }"
    @click="$emit('place', row, col)"
  >
    <div v-if="isStarPoint && !cell" class="star-point" />
    <div v-if="cell" class="piece" :class="`piece--${cell}`" />
    <div
      v-else-if="!gameOver"
      class="piece piece--preview"
      :class="`piece--preview-${previewPlayer}`"
    />
  </div>
</template>

<script setup lang="ts">
import type { CellState, Player } from "../types/game";

defineProps<{
  cell: CellState;
  row: number;
  col: number;
  isLastMove: boolean;
  isWinCell: boolean;
  gameOver: boolean;
  previewPlayer: Player;
  isStarPoint: boolean;
}>();

defineEmits<{
  place: [row: number, col: number];
}>();
</script>

<style lang="scss" scoped>
.cell {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  // &:first-child {
  //   background: pink;
  // }

  // horizontal line: center to right
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #c8a96e;
    transform: translateY(-0.5px);
  }

  // vertical line: center to bottom
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    background: #c8a96e;
    transform: translateX(-0.5px);
  }
}

.star-point {
  position: absolute;
  width: 14%;
  height: 14%;
  background: #c8a96e;
  border-radius: 50%;
  z-index: 1;
}

.piece {
  position: relative;
  width: 85%;
  height: 85%;
  border-radius: 50%;
  z-index: 2;
  transition: transform 0.15s ease;

  &--black {
    background: radial-gradient(circle at 35% 35%, #555, #111 60%, #000);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  &--white {
    background: radial-gradient(circle at 35% 35%, #fff, #e0e0e0 60%, #bbb);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  &--preview {
    z-index: 0;
    opacity: 0;
    transition: opacity 0.1s ease;

    &-black {
      background: radial-gradient(circle at 35% 35%, #555, #111 60%, #000);
    }

    &-white {
      background: radial-gradient(circle at 35% 35%, #fff, #e0e0e0 60%, #bbb);
    }
  }
}

.cell:not(.cell--occupied):hover .piece--preview {
  opacity: 0.35;
}

.cell--last .piece::after {
  content: "";
  position: absolute;
  width: 22%;
  height: 22%;
  background: #e74c3c;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cell--win .piece {
  animation: pulse 0.6s ease-in-out infinite alternate;
}

@keyframes pulse {
  from {
    box-shadow: 0 0 4px 2px rgba(231, 76, 60, 0.6);
  }
  to {
    box-shadow: 0 0 12px 6px rgba(231, 76, 60, 0.9);
  }
}
</style>
