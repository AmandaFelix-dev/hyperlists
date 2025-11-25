# hyper-list (Hypelist)

Um aplicativo simples de lista de tarefas (to-do) feito com **Vue 3**, **Vite** e **SCSS**.

Recursos:
- Adicionar tarefas com título, descrição e link do Spotify.
- Editar, deletar e salvar tarefas.
- Persistência local usando `localStorage` (salva no seu navegador / "localhost").
- Conversão automática de links de música do Spotify para o formato embed quando possível.

## Como usar (local)

1. Instale dependências:
   ```bash
   npm install
   ```
2. Rode em modo desenvolvimento:
   ```bash
   npm run dev
   ```
3. Abra o navegador no endereço mostrado pelo Vite (p.ex. http://localhost:5173).

## Estrutura principal
- `index.html` — arquivo de entrada.
- `src/main.js` — bootstrap do Vue.
- `src/App.vue` — componente principal.
- `src/components/TaskList.vue` — lista e lógica.
- `src/styles/main.scss` — estilos SCSS.

## Observações
- O app usa `localStorage` com a chave `hyper-list.tasks`.
- Se colar um link do Spotify (p.ex. https://open.spotify.com/track/ID), o app tenta convertê-lo para `https://open.spotify.com/embed/track/ID` para permitir embeds.

Divirta-se! 🚀
