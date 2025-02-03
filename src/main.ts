import '@/utils/validation-rules'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { createPinia } from 'pinia'
import 'sweetalert2/dist/sweetalert2.min.css'
import { createApp } from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(VueSweetalert2)
app.mount('#app')
