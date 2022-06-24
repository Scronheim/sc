import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import type {Settings} from '@/interfaces/settings'

const toast = useToast()

export const useSettingsStore = defineStore({
  id: 'settingsStore',
  state: () => ({
    settings: <Settings>{},
  }),
  getters: {},
  actions: {
    //=========================== PUT ===========================
    async updateServerSettings(settings: Array<string>) {
      for (const item of settings) {
        await axios.put(`/api/sc_settings/${item}`, {value: this.settings[item]})
      }
      toast.success('Настройки обновлены')
      this.getSettings()
    },
    //=========================== GET ===========================
    async getSettings() {
      const { data } = await axios.get('/api/server_settings')
      this.settings = data
    },
  },
})
