import './assets/main.css'
import './assets/esri-styles.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'

import '@mdi/font/css/materialdesignicons.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark'
    },
    icons: {
        iconfont: 'mdi', // Set the default icon set to mdi
    }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify) // Use Vuetify
app.use(VueApexCharts) // Use VueApexCharts

app.mount('#app')
