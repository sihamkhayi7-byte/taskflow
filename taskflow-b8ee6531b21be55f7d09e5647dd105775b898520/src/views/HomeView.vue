<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Task {
  id: string;
  title: string;
  done: boolean;
}

const tasks = ref<Task[]>([]);
const newTitle = ref('');
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:4000/tasks');
    tasks.value = await res.json();
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});

async function addTask() {
  if (!newTitle.value.trim()) return;
  const res = await fetch('http://localhost:4000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newTitle.value, done: false })
  });
  const newTask = await res.json();
  tasks.value.push(newTask);
  newTitle.value = '';
}

async function deleteTask(id: string) {
  await fetch('http://localhost:4000/tasks/' + id, { method: 'DELETE' });
  tasks.value = tasks.value.filter(t => t.id !== id);
}

async function toggleTask(task: Task) {
  const res = await fetch('http://localhost:4000/tasks/' + task.id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...task, done: !task.done })
  });
  const updated = await res.json();
  const index = tasks.value.findIndex(t => t.id === updated.id);
  tasks.value[index] = updated;
}
</script>

<template>
  <div style="padding: 2rem; max-width: 600px; margin: 0 auto;">
    <h1>Mes Tâches ({{ tasks.length }})</h1>

    <div style="display: flex; gap: 8px;">
      <input
        v-model="newTitle"
        placeholder="Nouvelle tâche..."
        @keyup.enter="addTask"
        style="flex:1; padding:8px"
      />
      <button @click="addTask" style="padding:8px 16px">➕ Ajouter</button>
    </div>

    <p v-if="loading">Chargement...</p>
    <p v-else-if="tasks.length === 0">Aucune tâche.</p>
    <ul v-else style="list-style:none; padding:0">
      <li v-for="task in tasks" :key="task.id" style="display:flex; align-items:center; gap:8px; margin:8px 0">
        <input type="checkbox" :checked="task.done" @change="toggleTask(task)" />
        <span :style="{ flex:1, textDecoration: task.done ? 'line-through' : 'none' }">
          {{ task.title }}
        </span>
        <button @click="deleteTask(task.id)">❌</button>
      </li>
    </ul>
  </div>
</template>