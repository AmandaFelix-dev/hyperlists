// ============================================
// GERENCIAMENTO DE LOCALSTORAGE
// ============================================

const STORAGE_KEY = 'todo-app-tasks'
const CATEGORIES_KEY = 'todo-app-categories'

/**
 * Salva as tarefas no localStorage
 */
export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    return true
  } catch (error) {
    console.error('Erro ao salvar tarefas:', error)
    return false
  }
}

/**
 * Carrega as tarefas do localStorage
 */
export const loadTasks = () => {
  try {
    const tasks = localStorage.getItem(STORAGE_KEY)
    return tasks ? JSON.parse(tasks) : []
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error)
    return []
  }
}

/**
 * Limpa todas as tarefas do localStorage
 */
export const clearTasks = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    console.error('Erro ao limpar tarefas:', error)
    return false
  }
}

/**
 * Salva as categorias personalizadas no localStorage
 */
export const saveCategories = (categories) => {
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories))
    return true
  } catch (error) {
    console.error('Erro ao salvar categorias:', error)
    return false
  }
}

/**
 * Carrega as categorias do localStorage
 */
export const loadCategories = () => {
  try {
    const categories = localStorage.getItem(CATEGORIES_KEY)
    return categories ? JSON.parse(categories) : ['Trabalho', 'Estudos', 'Pessoal', 'Músicas', 'Projetos', 'Anotações']
  } catch (error) {
    console.error('Erro ao carregar categorias:', error)
    return ['Trabalho', 'Estudos', 'Pessoal', 'Músicas', 'Projetos', 'Anotações']
  }
}

/**
 * Exporta as tarefas como JSON
 */
export const exportTasksAsJSON = (tasks) => {
  const dataStr = JSON.stringify(tasks, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `tarefas-${new Date().toISOString().split('T')[0]}.json`
  link.click()
  URL.revokeObjectURL(url)
}

/**
 * Importa tarefas de um arquivo JSON
 */
export const importTasksFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const tasks = JSON.parse(e.target.result)
        if (Array.isArray(tasks)) {
          resolve(tasks)
        } else {
          reject(new Error('Formato de arquivo inválido'))
        }
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = () => reject(new Error('Erro ao ler arquivo'))
    reader.readAsText(file)
  })
}
