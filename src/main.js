import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routes.js'
import * as Filters from './utils/filters'
import store from './store.js'
import axios from 'axios'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

// Optionnel : import des icônes Material Design si besoin
// import '@mdi/font/css/materialdesignicons.css'

// Configuration Axios (baseURL)
axios.defaults.baseURL = "https://boutique-e01d2-default-rtdb.europe-west1.firebasedatabase.app/"

// Création de l'app Vue 3
const app = createApp(App)

// Injection globale d'Axios
app.config.globalProperties.$http = axios

// Ajout des filtres globaux en tant que fonction utilitaire
app.config.globalProperties.$filters = Filters

// Utilisation des plugins
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi }
  }
})
app.use(router)
app.use(store)
app.use(vuetify)

// Intercepteur axios APRÈS l'initialisation du store
axios.interceptors.request.use(request => {
  const jwtToken = localStorage.getItem("jwtToken");
  if (jwtToken) {
    request.headers["Authorization"] = `Bearer ${jwtToken}`;
  }
  return request;
});

// Montage de l'app
app.mount('#app')

// Utilisation des filtres dans les composants Vue 3 :
// {{ $filters.nomDuFiltre(valeur) }}
//     }
//    })








createApp(App)
  .use(router)
  .use(vuetify)
  // .mount('#app')
