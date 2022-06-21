import { defineStore } from 'pinia'

export const leftMenuStore = defineStore({
  id: 'leftMenuStore',
  state: () => ({
    menu: [
      {text: 'Поиск ТС', to: '/lastamts', icon: 'mdi-car'},
      {text: 'Мониторинг', to: '/monitoring', icon: 'mdi-monitor'},
      {text: 'Карта', to: '/map', icon: 'mdi-map'},
      {text: 'Перехват', to: '/intersection', icon: 'mdi-monitor'},
      {text: 'Объекты', to: '/objects', icon: 'mdi-monitor'},
      {text: 'Комплексы', to: '/complexes', icon: 'mdi-monitor'},
      {text: 'Пользователи', to: '/users', icon: 'mdi-account-group'},
      {text: 'Группы', to: '/groups', icon: 'mdi-monitor'},
      {text: 'Система', to: '/system', icon: 'mdi-monitor-dashboard'},
      {text: 'Статистика', to: '/stats', icon: 'mdi-chart-line'},
      {text: 'Отчёты', to: '/reports', icon: 'mdi-file-chart'},
      {text: 'Розыск', to: '/searches', icon: 'mdi-magnify'},
      {text: 'Настройки', to: '/settings', icon: 'mdi-cog'},
      {text: 'Помощь', to: '/help', icon: 'mdi-help'},
    ]
  }),
  getters: {
    leftMenu: (state) => state.menu
  },
  actions: {
    
  }
})
