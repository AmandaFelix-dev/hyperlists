<template>
  <div class="app">
    <sidebar
      :selected-status="selectedStatus"
      :selected-category="selectedCategory"
      :categories="categories"
      :total-count="totalTasks"
      :pending-count="pendingCount"
      :completed-count="completedCount"
      :completion-rate="completionRate"
      :tasks-by-category="tasksByCategory"
      @update:selectedStatus="selectedStatus = $event"
      @update:selectedCategory="selectedCategory = $event"
      @new-task="openNewTaskForm"
      @clear-completed="clearCompleted"
    />

    <main class="app__main">
      <task-list
        :filtered-tasks="filteredTasks"
        :pending-tasks="pendingTasks"
        :completed-tasks="completedTasks"
        :selected-status="selectedStatus"
        :search-text="searchText"
        @update:searchText="searchText = $event"
        @new-task="openNewTaskForm"
        @toggle-task="toggleTaskCompletion"
        @edit-task="openEditTaskForm"
        @delete-task="deleteTask"
      />
    </main>

    <task-form
      :is-open="isFormOpen"
      :is-editing="isEditing"
      :editing-task="editingTask"
      :categories="categories"
      @submit="handleFormSubmit"
      @close="closeForm"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import TaskList from './components/TaskList.vue'
import TaskForm from './components/TaskForm.vue'
import { useTasks } from './utils/useTasks'

export default {
  name: 'App',
  components: {
    Sidebar,
    TaskList,
    TaskForm,
  },
  setup() {
    // Usar composable de tarefas
    const {
      tasks,
      categories,
      selectedCategory,
      selectedStatus,
      searchText,
      filteredTasks,
      pendingTasks,
      completedTasks,
      totalTasks,
      completionRate,
      initializeTasks,
      addTask,
      updateTask,
      deleteTask,
      toggleTaskCompletion,
      clearCompleted,
    } = useTasks()

    // Estado do formulário
    const isFormOpen = ref(false)
    const isEditing = ref(false)
    const editingTask = ref(null)

    // Computadas
    const pendingCount = computed(() => pendingTasks.value.length)
    const completedCount = computed(() => completedTasks.value.length)

    const tasksByCategory = computed(() => {
      const counts = {}
      categories.value.forEach(cat => {
        counts[cat] = tasks.value.filter(t => t.category === cat).length
      })
      return counts
    })

    // Métodos
    const openNewTaskForm = () => {
      isEditing.value = false
      editingTask.value = null
      isFormOpen.value = true
    }

    const openEditTaskForm = (task) => {
      isEditing.value = true
      editingTask.value = task
      isFormOpen.value = true
    }

    const closeForm = () => {
      isFormOpen.value = false
      isEditing.value = false
      editingTask.value = null
    }

    const handleFormSubmit = (formData) => {
      if (isEditing.value && editingTask.value) {
        const result = updateTask(editingTask.value.id, {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          dueDate: formData.dueDate,
        })
        if (result.success) {
          closeForm()
        }
      } else {
        const result = addTask(formData)
        if (result.success) {
          closeForm()
        }
      }
    }

    const handleDeleteTask = (taskId) => {
      if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
        deleteTask(taskId)
      }
    }

    const handleToggleTask = (taskId) => {
      toggleTaskCompletion(taskId)
    }

    const handleClearCompleted = () => {
      if (confirm('Tem certeza que deseja deletar todas as tarefas concluídas?')) {
        clearCompleted()
      }
    }

    // Inicializar
    onMounted(() => {
      initializeTasks()
    })

    return {
      tasks,
      categories,
      selectedCategory,
      selectedStatus,
      searchText,
      filteredTasks,
      pendingTasks,
      completedTasks,
      totalTasks,
      completionRate,
      pendingCount,
      completedCount,
      tasksByCategory,
      isFormOpen,
      isEditing,
      editingTask,
      openNewTaskForm,
      openEditTaskForm,
      closeForm,
      handleFormSubmit,
      deleteTask: handleDeleteTask,
      toggleTaskCompletion: handleToggleTask,
      clearCompleted: handleClearCompleted,
    }
  },
}
</script>

<style scoped lang="scss">
@import './styles/variables';
@import './styles/mixins';

.app {
  display: flex;
  height: 100vh;
  background-color: $color-light-gray;
  overflow: hidden;
}

.app__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: $color-light-gray;
}

@include media-md {
  .app {
    flex-direction: column;
  }

  .app__main {
    flex: 1;
  }
}
</style>
