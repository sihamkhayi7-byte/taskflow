import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Task {
  id: string
  title: string
  done: boolean
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])   // ✅ au lieu de ref<Task>([1])
  const loading = ref(true)
  const error = ref<string | null>(null)

  async function fetchTasks() { /* ... */ }
  async function addTask(title: string) { /* ... */ }
  async function deleteTask(id: string) { /* ... */ }
  async function toggleTask(task: Task) { /* ... */ }

  return { tasks, loading, error, fetchTasks, addTask, deleteTask, toggleTask }
})