<template>
  <section class="task-list" v-if="tasks.length">
    <div v-for="task in tasks" :key="task.id" class="task-card">
      <div class="left">
        <div class="meta">
          <strong v-if="!isEditing(task.id)">{{ task.title }}</strong>
          <input v-else v-model="edited[task.id].title" />
          <small class="date">{{ formatDate(task.createdAt) }}</small>
        </div>
        <div class="desc">
          <p v-if="!isEditing(task.id)">
            {{ task.description || "— sem descrição —" }}
          </p>
          <textarea v-else v-model="edited[task.id].description"></textarea>
        </div>
        <div class="spotify" v-if="task.spotify && !isEditing(task.id)">
          <a :href="task.spotify" target="_blank" rel="noreferrer"
            >Abrir link do Spotify</a
          >
          <div v-if="embedSrc(task.spotify)" class="embed">
            <iframe
              :src="embedSrc(task.spotify)"
              width="100%"
              height="80"
              frameborder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            ></iframe>
          </div>
        </div>
        <div class="spotify-edit" v-else-if="isEditing(task.id)">
          <input
            v-model="edited[task.id].spotify"
            placeholder="Link do Spotify (opcional)"
          />
        </div>
      </div>

      <div class="right">
        <div v-if="!isEditing(task.id)">
          <button class="secondary" @click="startEdit(task)">Editar</button>
        </div>
        <div v-else>
          <button class="secondary" @click="saveEdit(task.id)">Salvar</button>
          <button class="secondary" @click="cancelEdit(task.id)">
            Cancelar
          </button>
        </div>
        <button class="danger" @click="emitDelete(task.id)">Deletar</button>
      </div>
    </div>
  </section>
  <p v-else class="empty">Nenhuma tarefa ainda — adicione uma :)</p>
</template>

<script setup>
import { reactive, computed } from "vue";
import { toDisplayString as _toString } from "vue";
defineProps({ tasks: Array });
const emit = defineEmits(["update", "delete", "edit"]);

const edited = reactive({});
const editing = reactive({});

function startEdit(task) {
  editing[task.id] = true;
  edited[task.id] = { ...task };
}
function isEditing(id) {
  return !!editing[id];
}
function cancelEdit(id) {
  editing[id] = false;
  delete edited[id];
}
function saveEdit(id) {
  editing[id] = false;
  const updated = { ...edited[id] };
  emit("edit", updated);
  delete edited[id];
}
function emitDelete(id) {
  if (confirm("Você tem certeza de que quer deletar tarefa? 🧐"))
    emit("delete", id);
}

function formatDate(d) {
  try {
    return new Date(d).toLocaleString();
  } catch (e) {
    return d;
  }
}

function embedSrc(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    const hostname = u.hostname.replace("www.", "");
    if (hostname.includes("spotify.com")) {
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts.length >= 2) {
        const type = parts[0];
        const id = parts[1];
        return `https://open.spotify.com/embed/${type}/${id}`;
      }
    }
  } catch (e) {}
  return null;
}
</script>

<style scoped lang="scss">
.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  .task-card {
    display: flex;
    gap: 12px;
    padding: 12px;
    border: 1px solid #eee;
    border-radius: 8px;
    align-items: flex-start;
    .left {
      flex: 1;
      .meta {
        display: flex;
        gap: 8px;
        align-items: center;
        strong {
          font-size: 16px;
        }
        .date {
          color: #888;
          font-size: 12px;
        }
      }
      .desc {
        margin-top: 8px;
        p {
          margin: 0;
          color: #333;
        }
        textarea {
          width: 100%;
          min-height: 60px;
        }
      }
      .spotify {
        margin-top: 8px;
        a {
          display: inline-block;
          margin-bottom: 8px;
        }
        .embed {
          margin-top: 6px;
          border-radius: 6px;
          overflow: hidden;
        }
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      gap: 6px;
      button {
        padding: 6px 10px;
        border-radius: 6px;
        cursor: pointer;
      }
      .secondary {
        background: transparent;
        border: 1px solid #ddd;
      }
      .danger {
        background: #ffdddd;
        border: 1px solid #ffaaaa;
      }
    }
  }
}
.empty {
  color: #777;
  text-align: center;
  margin-top: 12px;
}
</style>
