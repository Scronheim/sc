import { defineStore } from 'pinia'
import axios from 'axios'

export const usersStore = defineStore({
  id: 'usersStore',
  state: () => ({
    users: [],
    userGroups: [],
    systemGroups: {
      azimuthadmin: 'Администратор',
      shadow: 'Администратор пользователей',
      roadinspector: 'Инспектор',
      raidmaster: 'Начальник ДЧ',
      azimuthap: 'Постановления',
    }
  }),
  actions: {
    async getUsers() {
      const { data } = await axios.get('/api/usermanager/users')
      this.users = data.objects
    },
    async getUserGroups() {
      const { data } = await axios.get('/api/usergroups/users_groups?results_per_page=100')
      this.userGroups = data.objects
    },
  },
  getters: {},
})
