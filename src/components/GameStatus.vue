<template>
  <div class="status">
    <div class="status__info">
      <template v-if="winner">
        <span class="status__result">🎉
          <span :class="winner === 'black' ? 'label--black' : 'label--white'">
            {{ winner === "black" ? "黑棋" : "白棋" }}
          </span>
          获胜！
        </span>
      </template>
      <template v-else-if="isDraw">
        <span class="status__result">平局！</span>
      </template>
      <template v-else>
        <span class="status__turn">
          当前轮到：
        </span>
        <span
          class="status__player"
          :class="currentPlayer === 'black' ? 'label--black' : 'label--white'"
        >
          {{ currentPlayer === "black" ? "黑棋" : "白棋" }}
        </span>
      </template>
    </div>

    <div class="status__actions">
      <button
        class="btn btn--undo"
        :disabled="history.length === 0"
        @click="$emit('undo')"
      >
        悔棋
      </button>
      <button
        class="btn btn--reset"
        @click="$emit('reset')"
      >
        重新开始
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Player } from "../types/game";

defineProps<{
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  history: { length: number };
}>();

defineEmits<{
  undo: [];
  reset: [];
}>();
</script>

<style lang="scss" scoped>
.status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: #faf9f6;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;

  &__info {
    font-size: 18px;
    font-weight: 600;
  }

  &__turn {
    color: #666;
  }

  &__result {
    color: #2c3e50;
  }

  &__actions {
    display: flex;
    gap: 10px;
  }
}

.label--black {
  color: #1a1a1a;
}

.label--white {
  color: #888;
}

.btn {
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &--undo {
    background: #ecf0f1;
    color: #2c3e50;

    &:hover:not(:disabled) {
      background: #d5dbdb;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &--reset {
    background: #e74c3c;
    color: #fff;

    &:hover {
      background: #c0392b;
    }
  }
}
</style>
