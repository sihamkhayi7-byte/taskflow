<script setup lang="ts">
interface Task {
  id: string
  title: string
  done: boolean
}

defineProps<{ task: Task }>()   // ✅ forme correcte

const emit = defineEmits<{
  toggle: [task: Task]
  delete: [id: string]
}>()
</script>

<template>
  <li style="display: flex; align-items: center; gap: 12px; ...">
    <input type="checkbox" :checked="task.done" @change="emit('toggle', task)" />
    <span :style="{ flex: 1, textDecoration: task.done ? 'line-through' : 'none' }">
      {{ task.title }}
    </span>
    <RouterLink :to="`/tasks/${task.id}`" style="color: #42b883;">Details</RouterLink>
    <button @click="emit('delete', task.id)">Del</button>
  </li>
</template>