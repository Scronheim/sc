<template>
  <v-card flat>
    <v-card-title>
      Список подключенных КИПТ
      <v-btn
        @click="addNewController"
        icon="mdi-plus"
        variant="text"
        color="success" />
      <v-btn
        @click="refreshControllers"
        icon="mdi-refresh"
        variant="text"
        color="info" />
      <v-spacer />
      <v-text-field
        label="Фильтр"
        v-model="filter" />
      <v-select
        label="Записей на страницу"
        :items="[10, 20, 50, 100, 10000]"
        v-model="controllersStore.perPage" />
    </v-card-title>
    <v-card-text>
      <v-table>
        <thead>
          <tr>
            <th>Серийный номер</th>
            <th>Тип</th>
            <th>Сетевой адрес</th>
            <th>Протокол</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="kipt in filteredControllers">
            <td>{{ kipt.serial }}</td>
            <td>{{ kipt.complex_name }}</td>
            <td>{{ kipt.host }}</td>
            <td>{{ convertDownloadProtocol(kipt.protocol) }}</td>
            <td>
              <v-btn
                icon="mdi-pencil"
                color="info"
                @click="editController(kipt)" />
              <v-btn
                icon="mdi-delete"
                color="error"
                @click="confirmDelete(kipt)" />
            </td>
          </tr>
        </tbody>
      </v-table>
      <v-pagination
        v-model="controllersStore.page"
        :length="controllersStore.totalPages"
        :total-visible="10" />
    </v-card-text>
  </v-card>

  <v-dialog v-model="controllerDialog">
    <v-card flat>
      <v-card-title>{{ isEdit ? 'Редактирование' : 'Добавление' }} КИПТ</v-card-title>
      <v-card-text>
        <v-text-field
          label="Серийный номер"
          v-model="currentController.serial" />
        <v-text-field
          label="Сетевой адрес"
          v-model="currentController.host" />
        <v-text-field
          label="Имя пользователя"
          v-model="currentController.username" />
        <v-text-field
          label="Пароль"
          v-model="currentController.password" />
        <v-select
          label="Тип комплекса"
          :items="['Азимут', 'Азимут 2', 'Азимут 3', 'Азимут 4']"
          v-model="currentController.complex_name" />
        <v-select
          label="Протокол"
          :items="downloadProtocols"
          item-value="id"
          item-title="name"
          v-model.number="currentController.protocol" />
        <v-textarea
          label="Публичный ключ"
          v-model="currentController.public_key" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="error"
          @click="controllerDialog = false"
          >Закрыть</v-btn
        >
        <v-btn
          v-if="isEdit"
          color="success"
          @click="updateCurrentController"
          >Сохранить</v-btn
        >
        <v-btn
          v-else
          color="success"
          @click="insertCurrentController"
          >Добваить</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <ConfirmDialog
    :visible="showConfirmDialog"
    :text="`Вы действительно хотите удалить контроллер ${currentController.serial}?`"
    @yes="deleteCurrentController"
    @no="showConfirmDialog = false" />
</template>

<script setup lang="ts">
  import { onMounted, watch, computed, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useToast } from 'vue-toastification'

  import { useControllersStore } from '@/stores/controllers'
  import type Controller from '@/interfaces/controller'
  import type DownloadProtocol from '@/interfaces/downloadProtocols'
  import ConfirmDialog from '@/components/ConfirmDialog.vue'

  const toast = useToast()
  const controllersStore = useControllersStore()
  const { page, perPage, controllers, downloadProtocols, currentController } = storeToRefs(controllersStore)
  const filter = ref('')
  const controllerDialog = ref(false)
  const showConfirmDialog = ref(false)
  const isEdit = ref(false)

  const filteredControllers = computed(() => {
    return controllers.value.filter((o) => {
      return (
        filter.value === '' ||
        o.serial.toUpperCase().indexOf(filter.value.toUpperCase()) >= 0 ||
        o.host.toUpperCase().indexOf(filter.value.toUpperCase()) >= 0
      )
    })
  })

  watch([page, perPage], () => {
    controllersStore.getPaginatedControllers()
  })

  onMounted(() => {
    controllersStore.getDownloadProtocols()
    controllersStore.getPaginatedControllers()
  })

  const convertDownloadProtocol = (protocolId: number) => {
    const protocol = controllersStore.downloadProtocols.find((p: DownloadProtocol) => {
      return p.id === protocolId
    })
    if (protocol) {
      return protocol.name
    }
  }

  const refreshControllers = async () => {
    await controllersStore.getPaginatedControllers()
    toast.success('Список контроллеров обновлён')
  }

  const editController = (controller: Controller) => {
    isEdit.value = true
    currentController.value = controller
    controllerDialog.value = true
  }

  const addNewController = () => {
    isEdit.value = false
    currentController.value = <Controller>{}
    controllerDialog.value = true
  }

  const updateCurrentController = () => {
    controllersStore.updateCurrentController()
    controllerDialog.value = false
  }

  const insertCurrentController = () => {
    controllersStore.insertCurrentController()
    controllerDialog.value = false
  }

  const confirmDelete = (controller: Controller) => {
    currentController.value = controller
    showConfirmDialog.value = true
  }

  const deleteCurrentController = () => {
    controllersStore.deleteCurrentController()
    showConfirmDialog.value = false
  }
</script>
