<script setup lang="ts">
import { ref, inject, onUnmounted } from 'vue'
import { type Store, queryDb } from '@livestore/livestore'
import { events, tables } from './livestore/schema'
import { StoreKey } from './store'

// Cast because we deliberately used `unknown` when exporting StoreKey to avoid generic conflicts
const store = inject(StoreKey as unknown as import('vue').InjectionKey<Store>) as Store

const visibleTodos$ = queryDb(
  (get) => {
    return tables.todos.where({
      deletedAt: null
    })
  },
  { label: 'visibleTodos' }
)

const todos = ref<ReadonlyArray<any>>([])
const unsubscribe = store.subscribe(visibleTodos$, {
  onUpdate: (result) => {
    todos.value = result
  },
})
onUnmounted(() => unsubscribe())

const newTodoText = ref('')
const createTodo = () => {
  store.commit(events.todoCreated({ id: crypto.randomUUID(), text: newTodoText.value }))
  newTodoText.value = ''
}

const toggleCompleted = (id: string) => {
  if (todos.value.find((todo) => todo.id === id)?.completed) {
    store.commit(events.todoUncompleted({ id }))
  } else {
    store.commit(events.todoCompleted({ id }))
  }
}
</script>

<template>
  <div class="todos">
    Todos
    <div class="new-todo">
      <input
        type="text"
        v-model="newTodoText"
        @keyup.enter="createTodo"
      />
      <button @click="createTodo">Add Todo</button>
    </div>
    <div
      v-for="todo in todos"
      :key="todo.id"
      class="todo"
    >
      <span
        v-if="todo.completed"
        style="text-decoration: line-through"
      >
        {{ todo.text }}
      </span>
      <span v-else>
        {{ todo.text }}
      </span>
      <button @click="toggleCompleted(todo.id)">Complete</button>
      <button @click="store.commit(events.todoDeleted({ id: todo.id, deletedAt: new Date() }))">Delete</button>
    </div>
  </div>
</template>

<style>
.completed {
  text-decoration: line-through;
}

.todos {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.todo,
.new-todo {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}
</style>