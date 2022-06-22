<template>
  <v-card flat>
    <v-card-title>
      Пользователи
      <v-btn
        icon="mdi-plus"
        variant="text"
        color="success" />
      <v-btn
        icon="mdi-refresh"
        variant="text"
        color="info" />
      <v-checkbox-btn v-model="hideLockedUsers" label="Скрыть неактивных пользователей"/>
      <v-spacer/>
      <v-text-field label="Фильтр" variant="outlined" v-model="filter" hide-details/>
    </v-card-title>
    <v-card-text>
      <v-table density="compact">
        <thead>
          <tr>
            <th>Имя</th>
            <th>ФИО, должность</th>
            <th>Системные группы</th>
            <th>Статус</th>
            <th>Действителен до</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers">
            <td>{{ user.login }}</td>
            <td>{{ user.comment }}</td>
            <td>
              <template v-for="group in pullUserGroupText(user)">{{
                group
              }}</template>
            </td>
            <td>
              <v-btn
                v-if="user.locked === 1"
                size="small"
                color="error"
                >Заблокирован</v-btn
              >
              <v-btn
                v-else
                size="small"
                color="success"
                >Активен</v-btn
              >
            </td>
            <td>{{ user.expire_date }}</td>
            <td>
              <v-btn
                icon="mdi-pencil"
                variant="text"
                color="info"
                @click="editUser(user)" />
              <v-btn
                icon="mdi-form-textbox-password"
                variant="text"
                color="info"
                @click="changeUserPasswordDialog(user)" />
              <v-btn
                icon="mdi-account-group"
                variant="text"
                color="secondary"
                @click="editGroupDialog(user)" />
              <v-btn
                icon="mdi-delete"
                variant="text"
                color="error" />
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>

  <v-dialog v-model="userDialog" width="40%">
    <v-card flat>
      <v-card-title
        >{{
          isAddUser ? 'Добавление' : 'Редактирование'
        }} пользователя</v-card-title
      >
      <v-card-text>
        <v-text-field label="Логин" :readonly="!isAddUser" v-model="currentUser.login"/>
        <v-text-field label="ФИО, должность" v-model="currentUser.comment"/>
        <v-text-field label="Действителен до" type="date" v-model="currentUser.expire_date"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="error" @click="userDialog = false">Закрыть</v-btn>
        <v-btn v-if="isAddUser" color="success">Добавить</v-btn>
        <v-btn v-else color="success">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="passwordDialog" width="40%">
    <v-card flat>
      <v-card-title>Смена пароля</v-card-title>
      <v-card-text>
        <v-text-field label="Пароль" v-model="newPasswords.password"/>
        <v-text-field label="Подтверждение пароля" v-model="newPasswords.confirmPassword"/>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="groupsDialog" width="40%">
    <v-card flat>
      <v-card-title>Редактирование групп</v-card-title>
      <v-card-text>
        <v-list density="compact" select-strategy="multiple">
          <v-list-subheader>Системные группы</v-list-subheader>
          <v-list-item v-for="(group, key) in systemGroups" density="compact">
            <template v-slot:default>
              <v-list-item-title>
                <v-checkbox-btn v-model="currentUser.groups" :value="key" :label="group" hide-details/>
              </v-list-item-title>
            </template>
          </v-list-item>
        </v-list>
        <v-list density="compact" select-strategy="multiple">
          <v-list-subheader>Пользовательские группы</v-list-subheader>
          <v-list-item v-for="group in store.userGroups" density="compact">
            <template v-slot:default>
              <v-list-item-title>
                <v-checkbox-btn v-model="currentUser.userGroups" :value="group.id" :label="group.name" hide-details/>
              </v-list-item-title>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import type User from '@/interfaces/user'
  import { usersStore } from '@/stores/users'
  const store = usersStore()
  store.getUsers()
  store.getUserGroups()
  const systemGroups: object = store.systemGroups
  const filter = ref<string>('')
  const hideLockedUsers = ref<boolean>(false)
  const userDialog = ref<boolean>(false)
  const passwordDialog = ref<boolean>(false)
  const groupsDialog = ref<boolean>(false)
  const isAddUser = ref<boolean>(false)
  const currentUser = ref<object>({
    groups: [],
    userGroups: [],
  })
  const newPasswords = ref<object>({
    password: null,
    confirmPassword: null,
  })

  const pullUserGroupText = (user: User) => {
    const result: string[] = []
    user.groups.forEach((g) => {
      if (g in systemGroups) {
        result.push(systemGroups[g])
      }
    })
    return result.join(', ')
  }

  const editUser = (user: User) => {
    isAddUser.value = false
    currentUser.value = user
    userDialog.value = true
  }

  const changeUserPasswordDialog = (user: User) => {
    currentUser.value = user
    passwordDialog.value = true
  }

  const editGroupDialog = (user: User) => {
    currentUser.value = user
    groupsDialog.value = true
  }

  const filteredUsers = computed<User[]>(() => {
    const result: any[] = []
    let user: User
    for (user of store.users) {
      if (user.locked === 1 && hideLockedUsers.value) {
        continue
      }
      if ((filter.value === '') ||
        (user.login.toUpperCase().indexOf(filter.value.toUpperCase())>=0) ||
        (user.comment.toUpperCase().indexOf(filter.value.toUpperCase())>=0)) {
        result.push(user)
      }
    }
    return result
  })
</script>
