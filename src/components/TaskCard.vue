<template>
  <div class="task-card" :class="{ completed: task.completed }">
    <div class="task-card__header">
      <div class="task-card__checkbox">
        <input type="checkbox" :id="`task-${task.id}`" :checked="task.completed" @change="$emit('toggle')"
          class="checkbox" />
        <label :for="`task-${task.id}`" class="checkbox-label"></label>
      </div>

      <div class="task-card__title-section">
        <h3 class="task-card__title">{{ task.title }}</h3>
        <p v-if="task.description" class="task-card__description">
          {{ truncateText(task.description, 80) }}
        </p>
      </div>

      <div class="task-card__actions">
        <button class="task-card__btn task-card__btn--edit" @click="$emit('edit')" title="Editar tarefa">
          ✏️
        </button>
        <button class="task-card__btn task-card__btn--delete" @click="$emit('delete')" title="Deletar tarefa">
          🗑️
        </button>
      </div>
    </div>

    <div class="task-card__footer">
      <div class="task-card__meta">
        <span v-if="task.category" class="task-card__category"
          :style="{ backgroundColor: getCategoryBgColor(task.category), color: getCategoryColor(task.category) }">
          {{ task.category }}
        </span>
        <span v-if="task.dueDate" class="task-card__date">
          📅 {{ formatDateRelative(task.dueDate) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { truncateText, getCategoryColor, getCategoryBgColor, formatDateRelative } from '../utils/helpers'

export default {
  name: 'TaskCard',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  emits: ['toggle', 'edit', 'delete'],
  methods: {
    truncateText,
    getCategoryColor,
    getCategoryBgColor,
    formatDateRelative,
  },
}
</script>

<style scoped lang="scss">
@import '../styles/variables';
@import '../styles/mixins';

.task-card {
  @include card-base;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  cursor: pointer;
  animation: slideIn $transition-base ease-out;

  &:hover {
    box-shadow: $shadow-md;
    border-color: $color-blue;
  }

  &.completed {
    opacity: 0.7;
    background-color: darken($color-white, 2%);

    .task-card__title {
      text-decoration: line-through;
      color: $color-gray-medium;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .task-card__description {
      color: $color-gray-medium;
    }
  }
}

.task-card__header {
  @include flex-between;
  gap: $spacing-md;
}

.task-card__checkbox {
  position: relative;
  flex-shrink: 0;

  .checkbox {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid $color-gray-light;
    border-radius: $radius-md;
    cursor: pointer;
    transition: all $transition-base;
    background-color: $color-white;

    &:hover {
      border-color: $color-blue;
      box-shadow: 0 0 0 2px $color-blue-light;
    }

    &:checked {
      background-color: $color-blue;
      border-color: $color-blue;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clip-rule='evenodd'/%3E%3C/svg%3E");
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
    }
  }

  .checkbox-label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}

.task-card__title-section {
  flex: 1;
  min-width: 0;
}

.task-card__title {
  font-family: $font-primary;
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $color-dark;
  margin: 0;
  word-break: break-word;
  transition: all $transition-base;
}

.task-card__description {
  font-size: $font-size-sm;
  color: $color-gray-dark;
  margin: $spacing-xs 0 0;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-card__actions {
  @include flex-center;
  gap: $spacing-sm;
  flex-shrink: 0;
}

.task-card__btn {
  background: none;
  border: none;
  font-size: $font-size-lg;
  cursor: pointer;
  padding: $spacing-xs;
  transition: all $transition-base;
  border-radius: $radius-md;
  opacity: 0.6;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  &--edit:hover {
    background-color: $color-blue-light;
  }

  &--delete:hover {
    background-color: $color-red-light;
  }
}

.task-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: $spacing-sm;
}

.task-card__meta {
  @include flex-center;
  gap: $spacing-sm;
  flex-wrap: wrap;
}

.task-card__category {
  display: inline-block;
  padding: $spacing-xs $spacing-sm;
  border-radius: $radius-md;
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;
  transition: all $transition-base;
}

.task-card__date {
  font-size: $font-size-xs;
  color: $color-gray-dark;
  font-weight: $font-weight-medium;
}

@include media-md {
  .task-card {
    padding: $spacing-md;
  }

  .task-card__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .task-card__actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
