<template>
  <div class="task-form">
    <div class="task-form__overlay" v-if="isOpen" @click="closeForm"></div>
    
    <transition name="slide">
      <div v-if="isOpen" class="task-form__modal">
        <div class="task-form__header">
          <h2 class="task-form__title">
            {{ isEditing ? 'Editar Tarefa' : 'Nova Tarefa' }}
          </h2>
          <button class="task-form__close" @click="closeForm">✕</button>
        </div>

        <form @submit.prevent="submitForm" class="task-form__content">
          <div class="form-group">
            <label for="title" class="form-label">Título *</label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              placeholder="Digite o título da tarefa"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label for="description" class="form-label">Descrição</label>
            <textarea
              id="description"
              v-model="formData.description"
              placeholder="Adicione detalhes da tarefa (opcional)"
              class="form-textarea"
              rows="4"
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="category" class="form-label">Categoria</label>
              <select v-model="formData.category" id="category" class="form-select">
                <option v-for="cat in categories" :key="cat" :value="cat">
                  {{ cat }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="dueDate" class="form-label">Data de Vencimento</label>
              <input
                id="dueDate"
                v-model="formData.dueDate"
                type="date"
                class="form-input"
              />
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn--secondary" @click="closeForm">
              Cancelar
            </button>
            <button type="submit" class="btn btn--primary">
              {{ isEditing ? 'Atualizar' : 'Criar Tarefa' }}
            </button>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TaskForm',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
    editingTask: {
      type: Object,
      default: null,
    },
    categories: {
      type: Array,
      default: () => ['Trabalho', 'Estudos', 'Pessoal', 'Músicas', 'Projetos', 'Anotações'],
    },
  },
  emits: ['submit', 'close'],
  data() {
    return {
      formData: {
        title: '',
        description: '',
        category: 'Pessoal',
        dueDate: '',
      },
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        if (this.isEditing && this.editingTask) {
          this.formData = {
            title: this.editingTask.title,
            description: this.editingTask.description,
            category: this.editingTask.category,
            dueDate: this.editingTask.dueDate || '',
          }
        } else {
          this.resetForm()
        }
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
  },
  methods: {
    submitForm() {
      this.$emit('submit', this.formData)
      this.resetForm()
    },
    closeForm() {
      this.$emit('close')
      this.resetForm()
    },
    resetForm() {
      this.formData = {
        title: '',
        description: '',
        category: 'Pessoal',
        dueDate: '',
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles/variables';
@import '../styles/mixins';

.task-form {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  pointer-events: none;
}

.task-form__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: auto;
  animation: fadeIn $transition-base ease-out;
}

.task-form__modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: $color-white;
  border-radius: $radius-lg;
  box-shadow: $shadow-xl;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  pointer-events: auto;
  animation: slideIn $transition-base ease-out;
  z-index: 1001;

  @include custom-scrollbar;
}

.task-form__header {
  @include flex-between;
  padding: $spacing-lg;
  border-bottom: 1px solid $color-gray-light;
  position: sticky;
  top: 0;
  background-color: $color-white;
  z-index: 10;
}

.task-form__title {
  font-family: $font-primary;
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $color-dark;
  margin: 0;
}

.task-form__close {
  background: none;
  border: none;
  font-size: $font-size-xl;
  cursor: pointer;
  color: $color-gray-dark;
  transition: all $transition-base;
  padding: $spacing-xs;
  border-radius: $radius-md;

  &:hover {
    background-color: $color-light-gray;
    color: $color-dark;
  }
}

.task-form__content {
  padding: $spacing-lg;
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.form-label {
  font-family: $font-primary;
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  color: $color-dark;
}

.form-input,
.form-textarea,
.form-select {
  @include input-base;
  font-family: $font-secondary;
  color: $color-dark;

  &::placeholder {
    color: $color-gray-medium;
  }

  &:disabled {
    background-color: $color-light-gray;
    cursor: not-allowed;
  }
}

.form-textarea {
  resize: vertical;
  font-family: $font-secondary;
  min-height: 100px;
}

.form-select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23626262'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right $spacing-sm center;
  background-size: 20px;
  padding-right: $spacing-xl;
  appearance: none;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-lg;

  @include media-sm {
    grid-template-columns: 1fr;
  }
}

.form-actions {
  @include flex-between;
  gap: $spacing-md;
  padding-top: $spacing-md;
  border-top: 1px solid $color-gray-light;
}

.btn {
  @include button-base;
  padding: $spacing-sm $spacing-lg;
  font-weight: $font-weight-semibold;
  border-radius: $radius-md;
  flex: 1;

  &--primary {
    background-color: $color-blue;
    color: $color-white;

    &:hover {
      background-color: darken($color-blue, 10%);
    }
  }

  &--secondary {
    background-color: $color-light-gray;
    color: $color-dark;

    &:hover {
      background-color: $color-gray-light;
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all $transition-base;
}

.slide-enter-from {
  opacity: 0;
  transform: translate(-50%, -45%);
}

.slide-leave-to {
  opacity: 0;
  transform: translate(-50%, -55%);
}

@include media-md {
  .task-form__modal {
    width: 95%;
    max-height: 95vh;
  }

  .task-form__content {
    padding: $spacing-md;
  }

  .form-row {
    gap: $spacing-md;
  }
}
</style>
