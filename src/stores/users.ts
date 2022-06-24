import { defineStore } from 'pinia'
import axios from 'axios'
import type { Me, User } from '@/interfaces/user'

export const useUsersStore = defineStore({
  id: 'usersStore',
  state: () => ({
    me: <Me>{},
    users: <User[]>[],
    userGroups: [],
    systemGroups: {
      azimuthadmin: 'Администратор',
      shadow: 'Администратор пользователей',
      roadinspector: 'Инспектор',
      raidmaster: 'Начальник ДЧ',
      azimuthap: 'Постановления',
    },
  }),
  actions: {
    async getAboutMe() {
      const { data } = await axios.get('/api/users/me')
      this.me = data
    },
    async getUsers() {
      const { data } = await axios.get('/api/usermanager/users')
      this.users = data.objects
    },
    async getUserGroups() {
      const { data } = await axios.get('/api/usergroups/users_groups?results_per_page=1000')
      this.userGroups = data.objects
    },
  },
  getters: {},
})
