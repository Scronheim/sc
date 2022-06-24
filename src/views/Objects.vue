<template>
  <v-card flat>
    <v-card-title>
      Объекты
      <v-btn
        icon="mdi-plus"
        variant="text"
        color="success" />
      <v-btn
        icon="mdi-refresh"
        variant="text"
        color="info" />
      <v-checkbox-btn v-model="hideDisabledObjects" label="Скрыть неактивные объекты"/>
      <v-spacer/>
      <v-text-field label="Фильтр" variant="outlined" v-model="filter" hide-details/>
    </v-card-title>
    <v-card-text>
      <ObjectsList :objects="objectStore.objects"/>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useObjectsStore } from '@/stores/objects'
  import { useControllersStore } from '@/stores/controllers'
  import ObjectsList from "@/components/ObjectsList.vue"
  const objectStore = useObjectsStore()
  const controllerStore = useControllersStore()
  objectStore.getObjects()
  controllerStore.getControllers()
  const hideDisabledObjects = ref(false)
  const filter = ref('')
</script>
