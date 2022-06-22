<template>
  <v-card flat>
    <v-card-title>Редактор группы</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field
            label="ID"
            :readonly="isEdit"
            v-model="item.id" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="Имя"
            v-model="item.group_name" />
        </v-col>
        <v-col>
          <v-text-field
            label="Направление"
            type="number"
            v-model.number="item.direction" />
        </v-col>
      </v-row>
      <v-row>
        <v-col> <v-select label="Объект" :items="store.objects" item-value="id" item-title="object_name"/> </v-col>
        <v-col>
          <v-text-field
            label="Долгота"
            v-model.number="item.lon" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success">Сохранить</v-btn>
      <v-btn color="primary">Добавить канал</v-btn>
      <v-btn color="error">Удалить группу</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  import { ref, defineProps } from 'vue'
  import { objectsStore } from '@/stores/objects'
  defineProps({
    item: Object,
    isEdit: {
      type: Boolean,
      default: true,
    },
  })
  const store = objectsStore()
</script>

<style scoped></style>
