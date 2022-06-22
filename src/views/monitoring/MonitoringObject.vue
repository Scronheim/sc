<template>
  <v-card flat>
    <v-card-title>
      <v-btn icon="mdi-arrow-left" @click="$router.push('/monitoring')" />
      {{ object.object_name }}
    </v-card-title>
    <v-card-text>
      <v-row v-for="chunk in chunkedChannels">
        <v-col v-for="channel in chunk" cols="3">
          <v-card flat>
            <v-card-subtitle>{{ channel.group.group_name }} - {{ channel.channel_name }}</v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-img v-if="channel.passages[0].path" :src="`/api/image/${channel.passages[0].path}`"/>
                </v-col>
              </v-row>
              <v-table>
                <thead>
                  <tr>
                    <th>Дата, время</th>
                    <th>ГРЗ</th>
                    <th>Скорость</th>
                    <th>Изобр.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="passage in channel.passages">
                    <td style="vertical-align: top; text-align: center">
                      {{ utils.convertToHumanDateTime(passage.fixation_date_time) }}
                    </td>
                    <td style="vertical-align: top; text-align: left" nowrap="nowrap">
                      {{ passage.gosnum }}{{ passage.regnum }}
                    </td>
                    <td style="vertical-align: top; text-align: center">
                      {{ passage.speed }}
                    </td>
                    <td>
                      <v-img v-if="passage.path" width="60px" height="60px" :src="`/api/image/${passage.path}`"
                           style="cursor: pointer"/>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import _ from 'lodash'
  import { objectsStore } from '@/stores/objects'
  import { utilsStore } from '@/stores/utils'
  import type { Channel, Group } from "@/interfaces/object"
  const route = useRoute()
  const store = objectsStore()
  const utils = utilsStore()

  const object = ref({
    groups: []
  })
  const channelIds = ref([])
  const stream = ref(null)

  onMounted(async () => {
    await store.getObjects()
    object.value = store.objects.find((o) => o.id === parseInt(route.params.id))
    object.value.groups.forEach((g) => {
      channelIds.value = g.channels.map((c) => c.id)
    })
    channelIds.value.forEach(async (channelId) => {
      const {data} = await store.getLastAmtsByChannelId(channelId)
      object.value.groups.forEach((g) => {
        const channel = g.channels.find((c) => c.id === channelId)
        channel.passages = data.data
      })
    })
    connectRedis(`?objects=[${route.params.id}]`)
  })

  const chunkedChannels = computed<Channel>(() => {
    const chunks:Channel[] = []
    object.value.groups.forEach((g:Group) => {
      g.channels.forEach((c:Channel) => {
        c.passages = [{}]
        c.group = g
        chunks.push(c)
      })
    })
    return _.chunk(chunks, 4)
  })

  const parseAmts = (amts) => {
    if (amts.db_channel_id) {
      const group = object.value.groups.find((g) => {
        return g.id === amts.group_id
      })
      const channel = group.channels.find((c) => {
        return c.id === amts.db_channel_id
      })
      const passage = {
        fixation_date_time: amts.fixation_time,
        gosnum: amts.gosnum,
        speed: +amts.speed.toFixed(3),
        path: amts.image.name,
        direction_name: amts.direction_name ? amts.direction_name : amts.group_name,
        channel_name: channel.channel_name,
        geopos: amts.geopos,
      }
      channel.passages.unshift(passage)
      if (channel.passages.length > 3) {
        channel.passages.pop()
      }
    }
  }

  const connectRedis = (params) => {
    stream.value = new EventSource(`/events${params}`)
    stream.value.onmessage = function(event) {
      parseAmts(JSON.parse(event.data))
    }
    stream.value.onerror = function() {
      console.log('error')
      // setTimeout(connectToRedis, 10000);
    }
  }
</script>
