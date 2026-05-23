<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Task { id: string; title: string; done: boolean }
const route = useRoute()
const router = useRouter()
const task = ref<Task | null>(null)

onMounted(async () => {
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  try {
    const res = await fetch(`http://localhost:4000/tasks/${id}`)
    if (!res.ok) throw new Error()
    task.value = await res.json()
  } catch {
    router.push('/')
  }
})
</script>