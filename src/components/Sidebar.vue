<template>
  <aside class="sidebar" :class="{ 'sidebar--collapsed': isCollapsed }">
    <div class="sidebar__header">
      <div v-if="!isCollapsed" class="sidebar__logo">
        <!-- <span class="sidebar__logo-icon">✓</span> -->
        <img src="@/assets/logo-star.png" alt="Logo Star" class="sidebar__logo-image" />
        <span class="sidebar__logo-text">Suas Tarefas</span>
      </div>
      <button class="sidebar__toggle" @click="toggleSidebar" :title="isCollapsed ? 'Expandir' : 'Recolher'">
        {{ isCollapsed ? '→' : '←' }}
      </button>
    </div>

    <div class="sidebar__content">
      <!-- Seção de Status -->
      <div class="sidebar__section">
        <h3 v-if="!isCollapsed" class="sidebar__section-title">Status</h3>
        <nav class="sidebar__nav">
          <button v-for="status in statuses" :key="status.id" class="sidebar__nav-item"
            :class="{ 'sidebar__nav-item--active': selectedStatus === status.id }" @click="selectStatus(status.id)"
            :title="status.label">
            <span class="sidebar__nav-icon">{{ status.icon }}</span>
            <span v-if="!isCollapsed" class="sidebar__nav-label">
              {{ status.label }}
              <span class="sidebar__nav-count">{{ getStatusCount(status.id) }}</span>
            </span>
          </button>
        </nav>
      </div>

      <!-- Seção de Categorias -->
      <div class="sidebar__section">
        <div v-if="!isCollapsed" class="sidebar__section-header">
          <h3 class="sidebar__section-title">Atividades por Categorias</h3>
        </div>
        <nav class="sidebar__nav">
          <button v-for="category in categories" :key="category" class="sidebar__nav-item"
            :class="{ 'sidebar__nav-item--active': selectedCategory === category }" @click="selectCategory(category)"
            :title="category">
            <span class="sidebar__nav-icon" :style="{ backgroundColor: getCategoryColor(category) }"></span>
            <span v-if="!isCollapsed" class="sidebar__nav-label">
              {{ category }}
              <span class="sidebar__nav-count">{{ getCategoryCount(category) }}</span>
            </span>
          </button>
        </nav>
      </div>

      <!-- Seção de Ações -->
      <div class="sidebar__section sidebar__section--actions">
        <button v-if="!isCollapsed" class="sidebar__action-btn sidebar__action-btn--primary" @click="$emit('new-task')">
          + Nova Tarefa
        </button>
        <button v-else class="sidebar__action-btn sidebar__action-btn--primary" @click="$emit('new-task')"
          title="Nova Tarefa">
          +
        </button>

        <button v-if="completedCount > 0 && !isCollapsed" class="sidebar__action-btn sidebar__action-btn--secondary"
          @click="$emit('clear-completed')" title="Limpar concluídas">
          🗑️ Limpar Concluídas
        </button>
      </div>
    </div>

    <!-- Rodapé com Estatísticas -->
    <div v-if="!isCollapsed" class="sidebar__footer">
      <div class="sidebar__stats">
        <div class="sidebar__stat">
          <span class="sidebar__stat-label">Total</span>
          <span class="sidebar__stat-value">{{ totalCount }}</span>
        </div>
        <div class="sidebar__stat">
          <span class="sidebar__stat-label">Progresso</span>
          <div class="sidebar__progress">
            <div class="sidebar__progress-bar" :style="{ width: completionRate + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { getCategoryColor } from '../utils/helpers'

export default {
  name: 'Sidebar',
  props: {
    selectedStatus: {
      type: String,
      default: 'todas',
    },
    selectedCategory: {
      type: String,
      default: 'Todas',
    },
    categories: {
      type: Array,
      default: () => ['Trabalho', 'Estudos', 'Pessoal', 'Músicas', 'Projetos', 'Anotações'],
    },
    totalCount: {
      type: Number,
      default: 0,
    },
    pendingCount: {
      type: Number,
      default: 0,
    },
    completedCount: {
      type: Number,
      default: 0,
    },
    completionRate: {
      type: Number,
      default: 0,
    },
    tasksByCategory: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:selectedStatus', 'update:selectedCategory', 'new-task', 'clear-completed'],
  data() {
    return {
      isCollapsed: false,
      statuses: [
        { id: 'todas', label: 'Todas as Tarefas', icon: '📋' },
        { id: 'pendentes', label: 'Em Andamento', icon: '⏳' },
        { id: 'concluidas', label: 'Concluídas', icon: '✅' },
      ],
    }
  },
  methods: {
    selectStatus(statusId) {
      this.$emit('update:selectedStatus', statusId)
    },
    selectCategory(category) {
      this.$emit('update:selectedCategory', category)
    },
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
    },
    getCategoryColor(category) {
      const colors = {
        'Trabalho': '#0066cc',
        'Estudos': '#9b59b6',
        'Pessoal': '#27ae60',
        'Músicas': '#e74c3c',
        'Projetos': '#f39c12',
        'Anotações': '#16a085',
      }
      return colors[category] || '#626262'
    },
    getStatusCount(statusId) {
      if (statusId === 'todas') return this.totalCount
      if (statusId === 'pendentes') return this.pendingCount
      if (statusId === 'concluidas') return this.completedCount
      return 0
    },
    getCategoryCount(category) {
      return this.tasksByCategory[category] || 0
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles/variables';
@import '../styles/mixins';

.sidebar {
  width: $sidebar-width;
  background-color: $color-white;
  border-right: 1px solid $color-gray-light;
  display: flex;
  flex-direction: column;
  height: 100vh;
  transition: all $transition-base;
  box-shadow: $shadow-sm;
  overflow-y: auto;

  @include custom-scrollbar;

  &--collapsed {
    width: $sidebar-width-collapsed;

    .sidebar__logo-text {
      display: none;
    }

    .sidebar__nav-label,
    .sidebar__section-title,
    .sidebar__section-header {
      display: none;
    }

    .sidebar__nav-icon {
      margin: 0;
    }
  }
}

.sidebar__header {
  @include flex-between;
  padding: $spacing-lg $spacing-md;
  border-bottom: 1px solid $color-gray-light;
  flex-shrink: 0;
  justify-content: center;
}

.sidebar__logo {
  @include flex-center;
  gap: $spacing-sm;
  flex: 1;
}

// .sidebar__logo-icon {
//   font-size: $font-size-xl;
//   font-weight: $font-weight-bold;
//   color: $color-blue;
// }

.sidebar__logo-image {
  width: 28px;  // ajuste como preferir
  height: 28px;
  object-fit: contain;
  margin-right: 8px;
}

.sidebar__logo-text {
  font-family: $font-primary;
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
  color: $color-dark;
}

.sidebar__toggle {
  background: none;
  border: none;
  font-size: $font-size-lg;
  cursor: pointer;
  color: $color-gray-dark;
  padding: $spacing-xs;
  border-radius: $radius-md;
  transition: all $transition-base;

  &:hover {
    background-color: $color-light-gray;
    color: $color-dark;
  }
}

.sidebar__content {
  flex: 1;
  overflow-y: auto;
  padding: $spacing-md 0;

  @include custom-scrollbar;
}

.sidebar__section {
  padding: $spacing-md $spacing-sm;
  border-bottom: 1px solid $color-light-gray;

  &--actions {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
    border: none;
    margin-top: auto;
  }
}

.sidebar__section-title {
  font-family: $font-primary;
  font-size: $font-size-xs;
  font-weight: $font-weight-bold;
  color: $color-gray-dark;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 $spacing-md;
}

.sidebar__section-header {
  @include flex-between;
  margin-bottom: $spacing-md;
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.sidebar__nav-item {
  @include flex-center;
  gap: $spacing-md;
  padding: $spacing-sm $spacing-md;
  background: none;
  border: none;
  border-radius: $radius-md;
  cursor: pointer;
  transition: all $transition-base;
  color: $color-gray-dark;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  text-align: left;
  justify-content: flex-start;

  &:hover {
    background-color: $color-light-gray;
    color: $color-dark;
  }

  &--active {
    background-color: $color-blue-light;
    color: $color-blue;
    font-weight: $font-weight-semibold;
  }
}

.sidebar__nav-icon {
  font-size: $font-size-lg;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: $radius-md;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 $spacing-xs;
}

.sidebar__nav-label {
  @include flex-between;
  flex: 1;
  gap: $spacing-sm;
}

.sidebar__nav-count {
  background-color: $color-light-gray;
  padding: 2px 6px;
  border-radius: $radius-sm;
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;
  color: $color-gray-dark;
  min-width: 24px;
  text-align: center;
}

.sidebar__action-btn {
  @include button-base;
  width: 100%;
  padding: $spacing-sm $spacing-md;
  border-radius: $radius-md;
  font-weight: $font-weight-semibold;
  transition: all $transition-base;

  &--primary {
    background-color: $color-blue;
    color: $color-white;

    &:hover {
      background-color: darken($color-blue, 10%);
    }
  }

  &--secondary {
    background-color: $color-red-light;
    color: $color-red;

    &:hover {
      background-color: darken($color-red-light, 5%);
    }
  }
}

.sidebar__footer {
  padding: $spacing-lg $spacing-md;
  border-top: 1px solid $color-gray-light;
  flex-shrink: 0;
}

.sidebar__stats {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.sidebar__stat {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.sidebar__stat-label {
  font-size: $font-size-xs;
  color: $color-gray-dark;
  font-weight: $font-weight-semibold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.sidebar__stat-value {
  font-family: $font-primary;
  font-size: $font-size-2xl;
  font-weight: $font-weight-bold;
  color: $color-dark;
}

.sidebar__progress {
  height: 6px;
  background-color: $color-light-gray;
  border-radius: $radius-sm;
  overflow: hidden;
}

.sidebar__progress-bar {
  height: 100%;
  background-color: $color-blue;
  border-radius: $radius-sm;
  transition: width $transition-slow;
}

@include media-md {
  .sidebar {
    width: $sidebar-width-collapsed;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 100;

    &--collapsed {
      transform: translateX(-100%);
    }
  }

  .sidebar__logo-text {
    display: none;
  }

  .sidebar__nav-label,
  .sidebar__section-title {
    display: none;
  }
}
</style>
