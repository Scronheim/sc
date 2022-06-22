import { defineStore } from 'pinia'
import axios from 'axios'
import type { Object } from '@/interfaces/object'

export const objectsStore = defineStore({
  id: 'objectsStore',
  state: () => ({
    objects: [] as Array<Object>,
    channelStatuses: [
      {state: 0, title: 'С последней фиксации прошло менее 30 мин.', color: 'bg-green'},
      {state: 1, title: 'С последней фиксации прошло от 30 минут до 24 часов', color: 'bg-orange'},
      {state: 2, title: 'С последней фиксации прошло более 24 часов', color: 'bg-red'},
      {state: 3, title: 'Нет данных или объект не активен', color: 'bg-brown'},
    ],
  }),
  actions: {
    getGroupInfoById(groupId:number) {
      return axios.get(`/api/groups/${groupId}`)
    },
    getObjectInfoById(objectId:number) {
      return axios.get(`/api/objects/${objectId}`)
    },
    getLastAmtsByChannelId(channelId:number) {
      return axios.get(`/api/lastamts/bychannel/${channelId}`)
    },
    async getObjects() {
      const { data } = await axios.get('/api/monitor/list')
      data.objects.sort((a:Object, b:Object) => {
        if (a.active === b.active) {
          if (a.object_name > b.object_name) return 1
          if (a.object_name < b.object_name) return -1
        } else {
          if (!a.active && b.active) return 1
          if (a.active && !b.active) return -1
        }
        return 0
      })
      this.objects = data.objects
    },
  },
  getters: {},
})
