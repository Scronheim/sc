import { defineStore } from 'pinia'
import axios from 'axios'
import type Controller from '@/interfaces/controller'

export const useControllersStore = defineStore({
  id: 'controllersStore',
  state: () => ({
    controllers: [] as Array<Controller>
  }),
  actions: {
    async getControllers() {
      const {data} = await axios.get(`/api/controllers?results_per_page=10000`)
      this.controllers = data.objects
    },
  },
  getters: {},
})
