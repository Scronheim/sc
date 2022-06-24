<template>
  <v-card flat>
    <v-card-title>Мониторинг</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="3">
          <v-text-field
            label="Фильтр"
            placeholder="Укажите id или название"
            hide-details
            v-model="filter" />
        </v-col>
        <v-col>
          <label for="legend">Легенда</label>
          <div id="legend">
            <div
              v-for="status in store.channelStatuses"
              style="
                width: 20px;
                height: 20px;
                float: left;
                border: solid 1px black;
              "
              :title="status.title"
              :class="status.color"></div>
          </div>
        </v-col>
      </v-row>
      <v-table density="compact">
        <thead>
          <tr>
            <th>ID</th>
            <th>Объект</th>
            <th>Статус каналов</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="object in filteredObjects"
            style="cursor: pointer"
            @click="$router.push(`/monitoring/${object.id}`)">
            <td>{{ object.id }}</td>
            <td>{{ object.object_name }}</td>
            <td>
              <div
                v-for="group in object.groups"
                :key="`group${group.id}`">
                <div
                  v-for="channel in group.channels"
                  :key="`channel${channel.id}`"
                  style="
                    width: 20px;
                    height: 20px;
                    float: left;
                    border: solid 1px black;
                  "
                  :title="`${group.group_name} (${channel.channel_name})`"
                  :class="{
                    'bg-green': channel.state === 0,
                    'bg-orange': channel.state === 1,
                    'bg-red': channel.state === 2,
                    'bg-brown': channel.state === 3,
                  }"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import type { Object } from '@/interfaces/object'
  import { useObjectsStore } from '@/stores/objects'
  const store = useObjectsStore()
  store.getObjects()
  const filter = ref('')
  const filteredObjects = computed<Object[]>(() => {
    return store.objects.filter((o:Object) => {
      return (
        filter.value === '' ||
        o.object_name.toUpperCase().indexOf(filter.value.toUpperCase()) >= 0 ||
        o.id.toString().indexOf(filter.value.toUpperCase()) >= 0
      )
    })
  })
</script>
