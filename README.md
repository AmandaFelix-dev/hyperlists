# 📋 Todo App - Vue 3 + Vite + SCSS

Um gerenciador de tarefas moderno e minimalista, inspirado no design do Notion. Construído com **Vue 3**, **Vite** e **SCSS**, com suporte completo a localStorage para persistência de dados.

## ✨ Características

- ✅ **Criar, editar e deletar tarefas** com título, descrição, categoria e data de vencimento
- 📂 **Organizar por categorias** (Trabalho, Estudos, Pessoal, Músicas, Projetos, Anotações)
- 🔍 **Buscar tarefas** por texto em tempo real
- 📊 **Filtrar por status** (Todas, Em Andamento, Concluídas)
- 💾 **Salvar automaticamente** em localStorage
- 🎨 **Design minimalista** estilo Notion com animações suaves
- 📱 **Responsivo** para desktop e mobile
- 🎯 **Sidebar colapsável** com estatísticas em tempo real
- ⌨️ **Atalhos e interações fluidas**

## 🚀 Como Usar

### 1. Instalação

```bash
# Clonar ou extrair o projeto
cd todo-app-vue3

# Instalar dependências
npm install
# ou
pnpm install
```

### 2. Executar em Desenvolvimento

```bash
npm run dev
# ou
pnpm dev
```

O servidor iniciará em `http://localhost:3000`

### 3. Build para Produção

```bash
npm run build
# ou
pnpm build
```

Os arquivos compilados estarão em `dist/`

## 📁 Estrutura do Projeto

```
todo-app-vue3/
├── src/
│   ├── components/
│   │   ├── TaskCard.vue        # Componente de tarefa individual
│   │   ├── TaskForm.vue        # Modal para criar/editar tarefas
│   │   ├── TaskList.vue        # Lista de tarefas com filtros
│   │   └── Sidebar.vue         # Navegação lateral com categorias
│   ├── styles/
│   │   ├── _variables.scss     # Variáveis de cores, tipografia, espaçamento
│   │   ├── _mixins.scss        # Mixins reutilizáveis (flexbox, media queries, etc)
│   │   └── global.scss         # Estilos globais e animações
│   ├── utils/
│   │   ├── helpers.js          # Funções auxiliares (formatação, validação, etc)
│   │   ├── storage.js          # Gerenciamento de localStorage
│   │   └── useTasks.js         # Composable Vue 3 para lógica de tarefas
│   ├── App.vue                 # Componente raiz
│   └── main.js                 # Ponto de entrada
├── index.html                  # Template HTML
├── vite.config.js              # Configuração do Vite
├── package.json                # Dependências do projeto
└── README.md                   # Este arquivo
```

## 🎨 Design e Estilização

### Paleta de Cores

- **Branco**: `#ffffff`
- **Cinza Claro**: `#f5f5f5`
- **Cinza Médio**: `#b3b3b3`
- **Cinza Escuro**: `#626262`
- **Azul Principal**: `#0066cc`
- **Verde**: `#27ae60`
- **Vermelho**: `#e74c3c`
- **Roxo**: `#9b59b6`

### Categorias com Cores

| Categoria | Cor |
|-----------|-----|
| Trabalho | Azul `#0066cc` |
| Estudos | Roxo `#9b59b6` |
| Pessoal | Verde `#27ae60` |
| Músicas | Vermelho `#e74c3c` |
| Projetos | Amarelo `#f39c12` |
| Anotações | Teal `#16a085` |

### ➕ Criar Tarefa

1. Clique em **"+ Nova Tarefa"** na sidebar ou no header
2. Preencha o título (obrigatório)
3. Adicione descrição (opcional)
4. Escolha uma categoria
5. Defina uma data de vencimento (opcional)
6. Clique em **"Criar Tarefa"**

### ✏️ Editar Tarefa

1. Clique no ícone ✏️ em uma tarefa
2. Modifique os campos desejados
3. Clique em **"Atualizar"**

### ✅ Concluir Tarefa

1. Clique no checkbox à esquerda da tarefa
2. A tarefa será movida para a seção "Concluídas"
3. Clique novamente para desfazer

### 🗑️ Deletar Tarefa

1. Clique no ícone 🗑️ em uma tarefa
2. Confirme a exclusão

### 🔍 Buscar Tarefas

1. Use o campo de busca no topo da lista
2. Digite parte do título ou descrição
3. Os resultados aparecem em tempo real

### 📂 Filtrar por Categoria

1. Clique em uma categoria na sidebar
2. Apenas tarefas dessa categoria serão exibidas
3. Clique em "Todas as Tarefas" para ver todas

### 📊 Filtrar por Status

1. Clique em um status na sidebar:
   - **Todas as Tarefas**: Exibe todas
   - **Em Andamento**: Apenas tarefas não concluídas
   - **Concluídas**: Apenas tarefas concluídas

### 🧹 Limpar Concluídas

1. Clique em **"🗑️ Limpar Concluídas"** na sidebar
2. Todas as tarefas concluídas serão deletadas permanentemente

## 💾 Persistência de Dados

Todas as tarefas são salvas automaticamente no `localStorage` do navegador. Isso significa:

- ✅ Os dados persistem após fechar e reabrir o navegador
- ✅ Cada navegador/dispositivo tem seus próprios dados
- ✅ Os dados não são sincronizados entre dispositivos
- ℹ️ Para exportar dados, você pode usar as funções em `utils/storage.js`

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔐 Validação

- ✅ Título é obrigatório
- ✅ Descrição é opcional
- ✅ Categoria padrão é "Pessoal"
- ✅ Data de vencimento é opcional
- ✅ Confirmação antes de deletar

## 📦 Dependências

```json
{
  "dependencies": {
    "vue": "^3.5.25"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.2",
    "sass": "^1.94.2",
    "vite": "^7.1.7"
  }
}
```

---

**Desenvolvido usando Vue 3, Vite e SCSS**

Aproveite o gerenciador de tarefas! 🚀
