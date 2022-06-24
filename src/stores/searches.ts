import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import type {SearchType} from '@/interfaces/searches'

const toast = useToast()

export const useSearchesStore = defineStore({
  id: 'searchesStore',
  state: () => ({
    searchTypes: [] as Array<SearchType>
  }),
  actions: {
    //=========================== DELETE ===========================
    async deleteSearchType(searchType: SearchType) {
      await axios.delete(`/api/search/types/${searchType.id}`)
      toast.success(`Тип розыска ${searchType.name} удалён`)
      this.getSearchTypes()
    },
    //=========================== PUT ===========================
    async updateSearchType(searchType: SearchType) {
      await axios.put(`/api/search/types/${searchType.id}`, searchType)
      toast.success(`Тип розыска ${searchType.name} сохранён`)
      this.getSearchTypes()
    },
    //=========================== POST ===========================
    async insertSearchType(searchType: SearchType) {
      await axios.post(`/api/search/types`, searchType)
      toast.success(`Тип розыска ${searchType.name} добавлен`)
      this.getSearchTypes()
    },
    //=========================== GET ===========================
    async getSearchTypes() {
      const {data} = await axios.get(`/api/search/types?results_per_page=10000`)
      this.searchTypes = data.objects
    },
  },
  getters: {},
})
