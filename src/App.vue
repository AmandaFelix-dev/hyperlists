<template>
  <div class="app">
    <header class="header">
      <h1>{{ title }}</h1>
      <p class="subtitle">
        Um aplicativo simples de tarefas — editar, deletar, salvar e adicionar
        músicas do Spotify.
      </p>
    </header>

    <main class="main">
      <section class="new-task">
        <input
          v-model="newTitle"
          placeholder="Título da tarefa"
          @keyup.enter="addTask"
        />
        <input v-model="newSpotify" placeholder="Link do Spotify (opcional)" />
        <textarea
          v-model="newDesc"
          placeholder="Descrição (opcional)"
        ></textarea>
        <div class="controls">
          <button
            class="secondary"
            @click="addTask"
            :disabled="!newTitle.trim()"
          >
            Adicionar
          </button>
          <button class="secondary" @click="clearInputs">Limpar</button>
        </div>
      </section>

      <TaskList
        :tasks="tasks"
        @update="saveTasks"
        @delete="deleteTask"
        @edit="editTask"
      />

      <footer class="footer">
        <small
          >{{ tasks.length }} tarefa(s) — salvo localmente no navegador</small
        >
      </footer>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import TaskList from "./components/TaskList.vue";

const title = "hyper-list";
const STORAGE_KEY = "hyper-list.tasks";

const tasks = ref([]);
const newTitle = ref("");
const newDesc = ref("");
const newSpotify = ref("");

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) tasks.value = JSON.parse(raw);
  } catch (e) {
    console.warn("Erro ao carregar tarefas:", e);
  }
}

function saveTasks(updated) {
  tasks.value = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value));
}

function addTask() {
  const t = newTitle.value.trim();
  if (!t) return;
  const task = {
    id: Date.now().toString(),
    title: t,
    description: newDesc.value.trim(),
    spotify: newSpotify.value.trim(),
    createdAt: new Date().toISOString(),
  };
  tasks.value.unshift(task);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value));
  newTitle.value = "";
  newDesc.value = "";
  newSpotify.value = "";
}

function clearInputs() {
  newTitle.value = "";
  newDesc.value = "";
  newSpotify.value = "";
}

function deleteTask(id) {
  const updated = tasks.value.filter((t) => t.id !== id);
  saveTasks(updated);
}

function editTask(updatedTask) {
  const idx = tasks.value.findIndex((t) => t.id === updatedTask.id);
  if (idx !== -1) {
    tasks.value.splice(idx, 1, updatedTask);
    saveTasks(tasks.value);
  }
}

onMounted(loadTasks);
</script>
