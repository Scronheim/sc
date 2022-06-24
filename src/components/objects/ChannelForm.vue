<template>
  <v-card flat>
    <v-card-title>Редактор канала</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field
            label="ID"
            type="number"
            :readonly="isEdit"
            v-model.number="item.id" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="Имя"
            v-model="item.channel_name" />
        </v-col>
        <v-col>
          <v-text-field
            label="ID камеры"
            v-model="item.camera_id" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="Объект"
            readonly
            v-model="currentObject.object_name" />
        </v-col>
        <v-col>
          <v-select
            label="Группа"
            :items="currentObject.groups"
            item-title="group_name"
            item-value="id"
            v-model="item.group_id" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success">Сохранить</v-btn>
      <v-btn color="error">Удалить канал</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  import { ref, defineProps, computed } from 'vue'
  import { useObjectsStore } from '@/stores/objects'
  const props = defineProps({
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

  const currentObject = computed(() => {
    return objectsStore.objects.find((o) => {
      return o.id === props.item.group.object_id
    })
  })
</script>

<style scoped></style>
