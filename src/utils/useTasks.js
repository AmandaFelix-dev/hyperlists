// ============================================
// COMPOSABLE - GERENCIAMENTO DE TAREFAS
// ============================================

import { ref, computed, watch } from 'vue'
import { saveTasks, loadTasks, saveCategories, loadCategories } from './storage'
import { generateId, validateTask, sortTasksByDate } from './helpers'

export const useTasks = () => {
  // Estado
  const tasks = ref([])
  const categories = ref(['Trabalho', 'Estudos', 'Pessoal', 'Músicas', 'Projetos', 'Anotações'])
  const selectedCategory = ref('Todas')
  const selectedStatus = ref('todas')
  const searchText = ref('')

  // Carrega dados ao inicializar
  const initializeTasks = () => {
    tasks.value = loadTasks()
    categories.value = loadCategories()
  }

  // Computadas
  const filteredTasks = computed(() => {
    let filtered = [...tasks.value]

    // Filtrar por categoria
    if (selectedCategory.value !== 'Todas') {
      filtered = filtered.filter(task => task.category === selectedCategory.value)
    }

    // Filtrar por status
    if (selectedStatus.value === 'pendentes') {
      filtered = filtered.filter(task => !task.completed)
    } else if (selectedStatus.value === 'concluidas') {
      filtered = filtered.filter(task => task.completed)
    }

    // Buscar por texto
    if (searchText.value.trim()) {
      const search = searchText.value.toLowerCase()
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(search) ||
        (task.description && task.description.toLowerCase().includes(search))
      )
    }

    return sortTasksByDate(filtered)
  })

  const pendingTasks = computed(() => tasks.value.filter(t => !t.completed))
  const completedTasks = computed(() => tasks.value.filter(t => t.completed))
  const totalTasks = computed(() => tasks.value.length)
  const completionRate = computed(() => {
    if (totalTasks.value === 0) return 0
    return Math.round((completedTasks.value.length / totalTasks.value) * 100)
  })

  // Métodos CRUD
  const addTask = (taskData) => {
    const validation = validateTask(taskData)
    if (!validation.valid) {
      return { success: false, error: validation.error }
    }

    const newTask = {
      id: generateId(),
      title: taskData.title.trim(),
      description: taskData.description?.trim() || '',
      category: taskData.category || 'Pessoal',
      dueDate: taskData.dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    tasks.value.push(newTask)
    return { success: true, task: newTask }
  }

  const updateTask = (taskId, updates) => {
    const index = tasks.value.findIndex(t => t.id === taskId)
    if (index === -1) {
      return { success: false, error: 'Tarefa não encontrada' }
    }

    tasks.value[index] = {
      ...tasks.value[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    return { success: true, task: tasks.value[index] }
  }

  const deleteTask = (taskId) => {
    const index = tasks.value.findIndex(t => t.id === taskId)
    if (index === -1) {
      return { success: false, error: 'Tarefa não encontrada' }
    }

    tasks.value.splice(index, 1)
    return { success: true }
  }

  const toggleTaskCompletion = (taskId) => {
    const task = tasks.value.find(t => t.id === taskId)
    if (!task) {
      return { success: false, error: 'Tarefa não encontrada' }
    }

    task.completed = !task.completed
    task.updatedAt = new Date().toISOString()
    return { success: true, task }
  }

  const clearCompleted = () => {
    const initialLength = tasks.value.length
    tasks.value = tasks.value.filter(t => !t.completed)
    return { success: true, deletedCount: initialLength - tasks.value.length }
  }

  // Gerenciamento de categorias
  const addCategory = (categoryName) => {
    const trimmed = categoryName.trim()
    if (!trimmed) {
      return { success: false, error: 'Nome da categoria é obrigatório' }
    }

    if (categories.value.includes(trimmed)) {
      return { success: false, error: 'Categoria já existe' }
    }

    categories.value.push(trimmed)
    return { success: true }
  }

  const removeCategory = (categoryName) => {
    const index = categories.value.indexOf(categoryName)
    if (index === -1) {
      return { success: false, error: 'Categoria não encontrada' }
    }

    // Não permite remover categorias padrão
    const defaultCategories = ['Trabalho', 'Estudos', 'Pessoal', 'Músicas', 'Projetos', 'Anotações']
    if (defaultCategories.includes(categoryName)) {
      return { success: false, error: 'Não é possível remover categorias padrão' }
    }

    categories.value.splice(index, 1)
    return { success: true }
  }

  // Salvar dados quando houver mudanças
  watch(tasks, (newTasks) => {
    saveTasks(newTasks)
  }, { deep: true })

  watch(categories, (newCategories) => {
    saveCategories(newCategories)
  }, { deep: true })

  return {
    // Estado
    tasks,
    categories,
    selectedCategory,
    selectedStatus,
    searchText,

    // Computadas
    filteredTasks,
    pendingTasks,
    completedTasks,
    totalTasks,
    completionRate,

    // Métodos
    initializeTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    clearCompleted,
    addCategory,
    removeCategory,
  }
}
