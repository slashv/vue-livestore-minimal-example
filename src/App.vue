<script setup lang="ts">
import { ref, inject } from 'vue'
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

const createTodo = () => store.commit(events.todoCreated({ id: crypto.randomUUID(), text: 'text' }))

const todos = ref(store.query(visibleTodos$))
</script>

<template>
  <div>
    Todos
    <div
      v-for="todo in todos"
      :key="todo.id"
    >
      {{ todo.text }}
    </div>
    <button @click="createTodo">Add Todo</button>
  </div>
</template>
