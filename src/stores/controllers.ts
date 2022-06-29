import { defineStore } from 'pinia'
import axios from 'axios'
import {useToast} from 'vue-toastification'

import type Controller from '@/interfaces/controller'
import type DownloadProtocol from '@/interfaces/downloadProtocols'

const toast = useToast()

export const useControllersStore = defineStore({
  id: 'controllersStore',
  state: () => ({
    controllers: <Array<Controller>>[],
    downloadProtocols: [] as Array<DownloadProtocol>,
    page: 1,
    perPage: 10,
    totalPages: 1,
    currentController: <Controller>{},
  }),
  actions: {
    async deleteCurrentController() {
      await axios.delete(`/api/controllers/${this.currentController.id}`)
      toast.success(`КИПТ ${this.currentController.serial} удалён`)
      await this.getPaginatedControllers()
    },
    async insertCurrentController() {
      await axios.post(`/api/controllers`, this.currentController)
      toast.success(`КИПТ ${this.currentController.serial} добавлен`)
      await this.getPaginatedControllers()
    },
    async updateCurrentController() {
      await axios.put(`/api/controllers/${this.currentController.id}`, this.currentController)
      toast.success(`КИПТ ${this.currentController.serial} сохранён`)
      await this.getPaginatedControllers()
    },
    async getDownloadProtocols() {
      const {data} = await axios.get(`/api/download_protocols`)
      this.downloadProtocols = data.objects
    },
    async getPaginatedControllers() {
      const {data} = await axios.get(`/api/controllers?page=${this.page}&results_per_page=${this.perPage}`)
      this.controllers = data.objects
      this.totalPages = data.total_pages
    },
    async getAllControllers() {
      const {data} = await axios.get(`/api/controllers?results_per_page=10000`)
      this.controllers = data.objects
    },
  },
  getters: {},
})
