<template>
  <v-card flat>
    <v-card-title>Редактор объекта</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field label="ID" :readonly="isEdit" v-model="item.id"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="Имя" v-model="item.object_name"/>
        </v-col>
        <v-col>
          <v-text-field label="Полное имя" v-model="item.full_name"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="Широта" v-model.number="item.lat"/>
        </v-col>
        <v-col>
          <v-text-field label="Долгота" v-model.number="item.lon"/>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success">Сохранить</v-btn>
      <v-btn color="primary">Добавить группу</v-btn>
      <v-btn color="error">Удалить объект</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
defineProps({
  item: Object,
  isEdit: {
    type: Boolean,
    default: true,
  },
})
</script>

<style scoped></style>
