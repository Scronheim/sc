import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const utilsStore = defineStore({
  id: 'utilsStore',
  state: () => ({

  }),
  actions: {
    convertToHumanDateTime(dateTime:string) {
      return dayjs(dateTime).format('DD.MM.YYYY HH:mm:ss')
    }
  }
})
