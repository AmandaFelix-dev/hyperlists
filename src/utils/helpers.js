// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================

/**
 * Gera um ID único usando timestamp e random
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Formata uma data para o formato brasileiro (DD/MM/YYYY)
 */
export const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

/**
 * Formata a data para exibição relativa (hoje, ontem, etc)
 */
export const formatDateRelative = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return 'Hoje'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Ontem'
  } else {
    return formatDate(dateString)
  }
}

/**
 * Converte uma data do formato brasileiro para ISO
 */
export const parseDateFromBR = (dateString) => {
  if (!dateString) return null
  const [day, month, year] = dateString.split('/')
  return `${year}-${month}-${day}`
}

/**
 * Trunca um texto com reticências
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

/**
 * Obtém a cor de uma categoria
 */
export const getCategoryColor = (category) => {
  const colors = {
    'Trabalho': '#0066cc',
    'Estudos': '#9b59b6',
    'Pessoal': '#27ae60',
    'Músicas': '#e74c3c',
    'Projetos': '#f39c12',
    'Anotações': '#16a085',
  }
  return colors[category] || '#626262'
}

/**
 * Obtém a cor de fundo de uma categoria
 */
export const getCategoryBgColor = (category) => {
  const colors = {
    'Trabalho': '#e6f0ff',
    'Estudos': '#f3e5f5',
    'Pessoal': '#e8f5e9',
    'Músicas': '#ffebee',
    'Projetos': '#fffde7',
    'Anotações': '#e0f2f1',
  }
  return colors[category] || '#f5f5f5'
}

/**
 * Valida se uma tarefa é válida
 */
export const validateTask = (task) => {
  if (!task.title || task.title.trim() === '') {
    return { valid: false, error: 'O título da tarefa é obrigatório' }
  }
  return { valid: true }
}

/**
 * Ordena tarefas por data de criação (mais recentes primeiro)
 */
export const sortTasksByDate = (tasks) => {
  return [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

/**
 * Filtra tarefas por categoria
 */
export const filterTasksByCategory = (tasks, category) => {
  if (category === 'Todas') return tasks
  return tasks.filter(task => task.category === category)
}

/**
 * Filtra tarefas por status
 */
export const filterTasksByStatus = (tasks, status) => {
  if (status === 'todas') return tasks
  if (status === 'pendentes') return tasks.filter(task => !task.completed)
  if (status === 'concluidas') return tasks.filter(task => task.completed)
  return tasks
}

/**
 * Busca tarefas por texto
 */
export const searchTasks = (tasks, searchText) => {
  if (!searchText.trim()) return tasks
  const lowerSearch = searchText.toLowerCase()
  return tasks.filter(task =>
    task.title.toLowerCase().includes(lowerSearch) ||
    (task.description && task.description.toLowerCase().includes(lowerSearch))
  )
}

/**
 * Calcula estatísticas das tarefas
 */
export const calculateStats = (tasks) => {
  return {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    completionRate: tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0,
  }
}
