import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Toast from 'vue-toastification'
import type {PluginOptions} from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const pinia = createPinia()
loadFonts()

const options: PluginOptions = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
};

createApp(App).use(pinia).use(router).use(vuetify).use(Toast, options).mount('#app')
