<template>
  <v-list nav density="compact">
    <v-list-item v-for="item in menu" :to="item.to" active-color="primary">
      <v-list-item-avatar start>
        <v-icon :icon="item.icon" />
      </v-list-item-avatar>
      <v-list-item-title>{{ item.text }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { leftMenuStore } from '@/stores/leftMenu'
const store = leftMenuStore()
const menu = store.leftMenu
</script>
