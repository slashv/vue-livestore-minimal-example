import './assets/main.css'
import { storePromise, StoreKey } from './store'

import { createApp } from 'vue'
import App from './App.vue'

const store = await storePromise

const app = createApp(App)

app.provide(StoreKey, store)

app.mount('#app')
