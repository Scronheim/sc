import { defineStore } from 'pinia'
import axios from 'axios'

export const useSystemStore = defineStore({
  id: 'systemStore',
  state: () => ({
    redis: {
      unix: {},
      tcp: {},
    },
    storage: {},
    db: {},
    supervisor: {},
    statistics: {
      added_to_db: 0,
    },
  }),
  getters: {

  },
  actions: {
    async getRedisStatus() {
      const {data} = await axios.get('/api/checkredis')
      this.redis = data
    },
    async getSupervisorStatus() {
      const {data} = await axios.get('/api/system/supervisor/status')
      this.supervisor = data
    },
    async getStatistics() {
      const {data} = await axios.get('/api/system/statistics')
      this.statistics = data
    },
    async getDbStatus() {
      const {data} = await axios.get('/api/checkdb')
      this.db = data
    },
    async getStorageStatus() {
      const {data} = await axios.get('/api/checkstorage')
      this.storage = data
    },
  }
})
