import { defineStore } from 'pinia'
import axios from 'axios'

export const settingsStore = defineStore({
  id: 'settingsStore',
  state: () => ({
    settings: {} as object,
  }),
  getters: {},
  actions: {
    async getSettings() {
      const { data } = await axios.get('/api/sc_settings?results_per_page=1000')
      data.objects.forEach((element) => {
        this.settings[element.key] = element.value
      })
    },
  },
})
