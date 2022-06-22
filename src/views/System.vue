<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          Состояние процессов
          <v-btn icon size="small" variant="outlined" color="success">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-table density="compact">
            <thead>
              <tr>
                <th>Имя процесса</th>
                <th>Состояние</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="process in store.supervisor">
                <td>{{ process.name }}</td>
                <td>
                  <v-icon v-if="process.statename === 'RUNNING'" color="success">mdi-check</v-icon>
                  <v-icon v-else-if="process.statename === 'STOPPED'" color="error">mdi-stop</v-icon>
                </td>
                <td>
                  <v-btn icon="mdi-play" :disabled="process.statename === 'RUNNING'" variant="flat" size="small" color="success"/>
                  <v-btn icon="mdi-stop" :disabled="process.statename === 'STOPPED'" variant="tonal" size="small" color="error"/>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>
          Статистика
          <v-btn icon size="small" variant="outlined" color="success">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-table density="compact">
            <thead>
              <tr>
                <th>Параметр</th>
                <th>Значение</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Сохранённых ТС</td>
                <td>{{ store.statistics.added_to_db }}</td>
              </tr>
              <tr>
                <td>Отброшенных ТС без группы</td>
                <td>{{ store.statistics.group_not_found }}</td>
              </tr>
              <tr>
                <td>Полученных ТС</td>
                <td>{{ store.statistics.received_for_save }}</td>
              </tr>
              <tr>
                <td>Очередь на сохранение</td>
                <td>{{ store.statistics.queuelength }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>
          Подключение к СУБД
          <v-btn icon size="small" variant="outlined" color="success">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-table density="compact">
            <thead>
              <tr>
                <th>Параметр</th>
                <th>Значение</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Состояние</td>
                <td>
                  <v-icon v-if="store.db.state" color="success">mdi-check</v-icon>
                  <v-icon v-else color="error">mdi-close</v-icon>
                </td>
              </tr>
              <tr>
                <td>Ошибка</td>
                <td>{{ store.db.error }}</td>
              </tr>
              <tr>
                <td>Строка подключения</td>
                <td>{{ store.db.drivername }}://{{ store.db.username }}@{{ store.db.database }}</td>
              </tr>
              <tr>
                <td>Очередь на сохранение</td>
                <td>{{ store.statistics.queuelength }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          Состояние Redis
          <v-btn icon size="small" variant="outlined" color="success">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-table density="compact">
            <thead>
              <tr>
                <th>Соединение</th>
                <th>Состояние</th>
                <th>Ошибка</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>unix</td>
                <td>
                  <v-icon v-if="store.redis.unix.state" color="success">mdi-check</v-icon>
                  <v-icon v-else color="error">mdi-close</v-icon>
                </td>
                <td>{{ store.redis.unix.error }}</td>
              </tr>
              <tr>
                <td>tcp</td>
                <td>
                  <v-icon v-if="store.redis.tcp.state" color="success">mdi-check</v-icon>
                  <v-icon v-else color="error">mdi-close</v-icon>
                </td>
                <td>{{ store.redis.tcp.error }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>
          Состояние хранилища
          <v-btn icon size="small" variant="outlined" color="success">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-table density="compact">
            <thead>
              <tr>
                <th>Путь</th>
                <th>Состояние</th>
                <th>Ошибка</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ store.storage.path }}</td>
                <td>
                  <v-icon v-if="store.storage.state" color="success">mdi-check</v-icon>
                  <v-icon v-else color="error">mdi-close</v-icon>
                </td>
                <td>{{ store.storage.error }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { systemStore } from '@/stores/system'
const store = systemStore()
store.getRedisStatus()
store.getSupervisorStatus()
store.getStatistics()
store.getDbStatus()
store.getStorageStatus()

</script>
