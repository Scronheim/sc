<template>
  <v-card flat>
    <v-card-title>Редактор объекта</v-card-title>
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
            v-model="item.object_name" />
        </v-col>
        <v-col>
          <v-text-field
            label="Полное имя"
            v-model="item.full_name" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="Широта"
            v-model.number="item.lat" />
        </v-col>
        <v-col>
          <v-text-field
            label="Долгота"
            v-model.number="item.lon" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="success"
        @click="updateObject">Сохранить
      </v-btn>
      <v-btn color="primary" @click="showAddDialog">Добавить группу</v-btn>
      <v-btn color="error">Удалить объект</v-btn>
    </v-card-actions>
  </v-card>

  <v-dialog v-model="addGroupDialog">
    <v-card flat>
      <v-card-title>Добавление группы</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field label="ID" :readonly="manualIdDisabled" v-model="newGroup.id"/>
          </v-col>
          <v-col>
            <v-checkbox density="compact" label="Задать вручную" v-model="manualIdDisabled"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Имя" v-model="newGroup.group_name"/>
          </v-col>
          <v-col>
            <v-text-field label="Направление" type="number" v-model.number="newGroup.direction"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              label="Объект"
              :items="objectsStore.objects"
              item-value="id"
              item-title="object_name"
              v-model="newGroup.object_id"/>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="error" @click="addGroupDialog = false">Закрыть</v-btn>
        <v-btn color="success" @click="insertNewGroup">Добавить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { ref, defineProps } from 'vue'
  import { useObjectsStore } from '@/stores/objects'
  import type { Group } from '@/interfaces/object'

  const props = defineProps({
    item: Object,
    isEdit: {
      type: Boolean,
      default: true,
    },
  })

  const objectsStore = useObjectsStore()
  const addGroupDialog = ref(false)
  const newGroup = ref<Group>({ channels: undefined, direction: 0, group_name: "", object_id: 0 })
  const manualIdDisabled = ref(true)

  const updateObject = () => {
    objectsStore.updateObjectInfo(props.item)
  }

  const showAddDialog = () => {
    addGroupDialog.value = true
  }

  const insertNewGroup = () => {
    objectsStore.insertGroup(newGroup.value)
  }
</script>

<style scoped></style>
