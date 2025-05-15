import './assets/main.css'
import { storePromise, StoreKey } from './store'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const store = await storePromise

const app = createApp(App)

app.provide(StoreKey, store)
app.use(router)

app.mount('#app')
