import { defineStore } from 'pinia'

export const leftMenuStore = defineStore({
  id: 'leftMenuStore',
  state: () => ({
    menu: [
      {text: 'Поиск ТС', to: '/lastamts', icon: 'mdi-car'},
      {text: 'Мониторинг', to: '/monitoring', icon: 'mdi-monitor'},
      {text: 'Карта', to: '/map', icon: 'mdi-map'},
      {text: 'Перехват', to: '/intersection', icon: 'mdi-monitor-multiple'},
      {text: 'Объекты', to: '/objects', icon: 'mdi-map-marker-multiple'},
      {text: 'Комплексы', to: '/controllers', icon: 'mdi-server'},
      {text: 'Пользователи', to: '/users', icon: 'mdi-account-group'},
      {text: 'Система', to: '/system', icon: 'mdi-monitor-dashboard'},
      {text: 'Статистика', to: '/stats', icon: 'mdi-chart-line'},
      {text: 'Отчёты', to: '/reports', icon: 'mdi-file-chart'},
      {text: 'Розыск', to: '/searches', icon: 'mdi-magnify'},
      {text: 'Настройки', to: '/settings', icon: 'mdi-cog'},
      {text: 'Помощь', to: '/help', icon: 'mdi-help'},
    ]
  }),
  getters: {},
  actions: {

  }
})
