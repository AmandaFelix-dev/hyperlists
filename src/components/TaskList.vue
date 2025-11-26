<template>
  <div class="task-list">
    <!-- Cabeçalho com Busca -->
    <div class="task-list__header">
      <div class="task-list__search">
        <input v-model="localSearchText" type="text" placeholder="🔍 Buscar tarefas..." class="task-list__search-input"
          @input="$emit('update:searchText', localSearchText)" />
      </div>
      <button class="task-list__add-btn" @click="$emit('new-task')">
        Nova Tarefa +
      </button>
    </div>

    <!-- Seção de Tarefas em Andamento -->
    <section v-if="selectedStatus === 'todas' || selectedStatus === 'pendentes'" class="task-list__section">
      <div class="task-list__section-header">
        <h2 class="task-list__section-title">⏳ Em Andamento</h2>
        <span class="task-list__section-count">{{ pendingTasks.length }}</span>
      </div>

      <div v-if="pendingTasks.length > 0" class="task-list__grid">
        <task-card v-for="task in pendingTasks" :key="task.id" :task="task" @toggle="$emit('toggle-task', task.id)"
          @edit="$emit('edit-task', task)" @delete="$emit('delete-task', task.id)" />
      </div>
      <div v-else class="task-list__empty">
        <p class="task-list__empty-text">Nenhuma tarefa em andamento</p>
        <p class="task-list__empty-subtext">Crie uma nova tarefa para começar!</p>
      </div>
    </section>

    <!-- Seção de Tarefas Concluídas -->
    <section v-if="selectedStatus === 'todas' || selectedStatus === 'concluidas'" class="task-list__section">
      <div class="task-list__section-header">
        <h2 class="task-list__section-title">✅ Concluídas</h2>
        <span class="task-list__section-count">{{ completedTasks.length }}</span>
      </div>

      <div v-if="completedTasks.length > 0" class="task-list__grid">
        <task-card v-for="task in completedTasks" :key="task.id" :task="task" @toggle="$emit('toggle-task', task.id)"
          @edit="$emit('edit-task', task)" @delete="$emit('delete-task', task.id)" />
      </div>
      <div v-else class="task-list__empty">
        <p class="task-list__empty-text">Nenhuma tarefa concluída</p>
        <p class="task-list__empty-subtext">Complete tarefas para vê-las aqui!</p>
      </div>
    </section>

    <!-- Mensagem quando não há resultados de busca -->
    <div v-if="filteredTasks.length === 0 && searchText.trim()" class="task-list__no-results">
      <p class="task-list__no-results-text">😔 Nenhuma tarefa encontrada</p>
      <p class="task-list__no-results-subtext">Tente buscar por outro termo</p>
    </div>
  </div>
</template>

<script>
import TaskCard from './TaskCard.vue'

export default {
  name: 'TaskList',
  components: {
    TaskCard,
  },
  props: {
    filteredTasks: {
      type: Array,
      default: () => [],
    },
    pendingTasks: {
      type: Array,
      default: () => [],
    },
    completedTasks: {
      type: Array,
      default: () => [],
    },
    selectedStatus: {
      type: String,
      default: 'todas',
    },
    searchText: {
      type: String,
      default: '',
    },
  },
  emits: ['update:searchText', 'new-task', 'toggle-task', 'edit-task', 'delete-task'],
  data() {
    return {
      localSearchText: this.searchText,
    }
  },
  watch: {
    searchText(newVal) {
      this.localSearchText = newVal
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles/variables';
@import '../styles/mixins';

.task-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  padding: $spacing-lg;
  overflow-y: auto;

  @include custom-scrollbar;
}

.task-list__header {
  @include flex-between;
  gap: $spacing-md;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  background-color: $color-light-gray;
  padding: $spacing-md;
  margin: -$spacing-md - $spacing-md 0;
  padding: $spacing-lg;
  z-index: 10;
}

.task-list__search {
  flex: 1;
  min-width: 200px;
  width: 100%;
}

.task-list__search-input {
  @include input-base;
  width: 100%;
  font-size: $font-size-base;
}

.task-list__add-btn {
  @include button-base;
  background-color: $color-blue;
  color: $color-white;
  padding: $spacing-sm $spacing-lg;
  font-weight: $font-weight-semibold;
  border-radius: $radius-md;
  transition: all $transition-base;
  white-space: nowrap;

  &:hover {
    background-color: darken($color-blue, 10%);
    transform: translateY(-2px);
  }

  @include media-sm {
    width: 100%;
  }
}

.task-list__section {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  animation: slideIn $transition-base ease-out;
}

.task-list__section-header {
  @include flex-between;
  gap: $spacing-md;
  padding-bottom: $spacing-md;
  border-bottom: 2px solid $color-gray-light;
  margin-top: 60px;
}

.task-list__section-title {
  font-family: $font-primary;
  font-size: $font-size-2xl;
  font-weight: $font-weight-bold;
  color: $color-dark;
  margin: 0;
}

.task-list__section-count {
  background-color: $color-blue-light;
  color: $color-blue;
  padding: $spacing-xs $spacing-md;
  border-radius: $radius-md;
  font-size: $font-size-sm;
  font-weight: $font-weight-bold;
  min-width: 40px;
  text-align: center;
}

.task-list__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: $spacing-md;
  margin-top: 20px;

  @include media-md {
    grid-template-columns: 1fr;
  }
}

.task-list__empty {
  @include flex-column-center;
  gap: $spacing-md;
  padding: $spacing-3xl $spacing-lg;
  text-align: center;
  background-color: $color-light-gray;
  border-radius: $radius-lg;
  border: 2px dashed $color-gray-light;
  margin-top: 20px;
}

.task-list__empty-text {
  font-family: $font-primary;
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $color-gray-dark;
  margin: 0;
}

.task-list__empty-subtext {
  font-size: $font-size-sm;
  color: $color-gray-medium;
  margin: 0;
}

.task-list__no-results {
  @include flex-column-center;
  gap: $spacing-md;
  padding: $spacing-3xl $spacing-lg;
  text-align: center;
  background-color: $color-light-gray;
  border-radius: $radius-lg;
}

.task-list__no-results-text {
  font-family: $font-primary;
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $color-gray-dark;
  margin: 0;
}

.task-list__no-results-subtext {
  font-size: $font-size-sm;
  color: $color-gray-medium;
  margin: 0;
}

@include media-md {
  .task-list {
    padding: $spacing-md;
  }

  .task-list__header {
    flex-direction: column;
    margin: -$spacing-md -$spacing-md 0;
  }

  .task-list__add-btn {
    width: 100%;
  }
}
</style>
