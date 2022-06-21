<template>
  <v-app>
    <v-navigation-drawer app expand-on-hover rail>
      <LeftMenu/>
    </v-navigation-drawer>
    <v-app-bar app density="compact">
      <v-app-bar-title>Азимут-ПТ</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import LeftMenu from './components/LeftMenu.vue';
</script>
