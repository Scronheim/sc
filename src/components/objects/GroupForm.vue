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
        <v-col>
          <v-text-field
            label="Дополнительный идентификатор"
            v-model="item.additional_text_id" />
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
        <v-col>
          <v-select
            label="Объект"
            :items="objectsStore.objects"
            item-value="id"
            item-title="object_name"
            v-model="item.object_id"/>
        </v-col>
        <v-col>
          <v-select
            label="КИПТ"
            :items="controllersStore.controllers"
            item-value="id"
            item-title="serial"
            v-model="item.controller_id"/>
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
  import { useObjectsStore } from '@/stores/objects'
  import { useControllersStore } from '@/stores/controllers'
  defineProps({
    item: {
      type: Object,
      required: true,
    },
    isEdit: {
      type: Boolean,
      default: true,
    },
  })
  const objectsStore = useObjectsStore()
  const controllersStore = useControllersStore()
</script>

<style scoped></style>
