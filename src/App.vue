<template>
  <v-app>
    <v-navigation-drawer app expand-on-hover rail>
      <LeftMenu/>
    </v-navigation-drawer>
    <v-app-bar app density="compact">
      <v-app-bar-title>Азимут-ПТ — {{ settingsStore.settings.agglomeration }}</v-app-bar-title>
      <v-spacer/>
      {{ usersStore.me.comment }} ({{ usersStore.me.user }})
      <v-btn color="info">Выход</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import LeftMenu from './components/LeftMenu.vue'
import { useUsersStore } from '@/stores/users'
import { useSettingsStore } from '@/stores/settings'
const usersStore = useUsersStore()
const settingsStore = useSettingsStore()
usersStore.getAboutMe()
settingsStore.getSettings()
</script>
