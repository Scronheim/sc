<template>
  <v-card flat>
    <v-card-title>
      Типы розыков
      <v-btn
        icon="mdi-plus"
        color="success"
        @click="addNewSearchType" />
    </v-card-title>
    <v-card-text>
      <v-table density="compact">
        <thead>
          <tr>
            <th>ID</th>
            <th>Наименование</th>
            <th>Владелец</th>
            <th>Группа</th>
            <th>Активен</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="type in searchesStore.searchTypes">
            <td>{{ type.id }}</td>
            <td>{{ type.name }}</td>
            <td>{{ type.owner_user }}</td>
            <td>{{ type.owner_group }}</td>
            <td>
              <v-checkbox-btn v-model="type.enabled" />
            </td>
            <td>
              <v-btn
                icon="mdi-wrench"
                color="secondary" />
              <v-btn
                icon="mdi-pencil"
                color="info" />
              <v-btn
                icon="mdi-upload"
                color="orange" />
              <v-btn
                @click="showConfirmDialog(type)"
                icon="mdi-delete"
                color="error" />
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>

  <v-dialog v-model="editSearchTypeDialog">
    <v-card flat>
      <v-card-title>Тип розыска</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              label="Наименование"
              v-model="currentSearchType.name" />
          </v-col>
          <v-col>
            <v-checkbox-btn
              label="Индивидуальный"
              v-model="searchTypeIsIndividual" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              label="Группы"
              :disabled="searchTypeIsIndividual"
              :items="usersStore.me.user_groups"
              item-value="id"
              item-title="name"
              v-model.number="currentSearchType.owner_group" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="error"
          @click="editSearchTypeDialog = false"
          >Закрыть
        </v-btn>
        <v-btn
          color="success"
          @click="saveSearchType"
          >{{ isEdit ? 'Сохранить' : 'Добавить' }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <ConfirmDialog
    :visible="confirmDialog.visible"
    :text="confirmDialog.text"
    @yes="deleteSearchType"
    @no="confirmDialog.visible = false"
  />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import type { SearchType } from '@/interfaces/searches'
  import { useSearchesStore } from '@/stores/searches'
  import { useUsersStore } from '@/stores/users'
  import ConfirmDialog from '@/components/ConfirmDialog.vue'
  //===================== STORES =====================
  const searchesStore = useSearchesStore()
  const usersStore = useUsersStore()
  searchesStore.getSearchTypes()
  //===================== VARIABLES =====================
  const filter = ref('')
  const currentSearchType = ref(<SearchType>{})
  const isEdit = ref(false)
  const editSearchTypeDialog = ref(false)
  const searchTypeIsIndividual = ref(false)
  const confirmDialog = ref({
    visible: false,
    text: '',
  })
  //===================== METHODS =====================
  const addNewSearchType = () => {
    isEdit.value = false
    currentSearchType.value = <SearchType>{}
    editSearchTypeDialog.value = true
  }

  const saveSearchType = () => {
    if (isEdit.value) {
      searchesStore.updateSearchType(currentSearchType.value)
    } else {
      searchesStore.insertSearchType(currentSearchType.value)
    }
  }

  const showConfirmDialog = (searchType: SearchType) => {
    currentSearchType.value = searchType
    confirmDialog.value.text = `Вы действительно хотите удалить тип розыска ${searchType.name}?`
    confirmDialog.value.visible = true
  }

  const deleteSearchType = () => {
    searchesStore.deleteSearchType(currentSearchType.value)
    confirmDialog.value.visible = false
  }
</script>
