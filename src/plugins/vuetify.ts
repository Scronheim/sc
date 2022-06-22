// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  defaults: {
    VTextField: {
      hideDetails: true,
      variant: 'plain'
    },
    VBtn: {
      variant: 'text',
    }
  },
  theme: {
    defaultTheme: 'dark'
  }
})
