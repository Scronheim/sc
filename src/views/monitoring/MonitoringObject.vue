<template>
  <v-card flat>
    <v-card-title>
      <v-btn
        icon="mdi-arrow-left"
        @click="$router.push('/monitoring')" />
      {{ object.object_name }}
    </v-card-title>
    <v-card-text>
      <v-row v-for="chunk in chunkedChannels">
        <v-col v-for="channel in chunk" cols="3" class="pa-0">
          <v-card flat>
            <v-card-subtitle style="min-height: 35px">
              {{ channel.group.group_name }} - {{ channel.channel_name }}
            </v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-img
                    v-if="channel.passages.length"
                    :src="`/api/image/${channel.passages[0].image.name}`" />
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
                    <td
                      style="vertical-align: top; text-align: left"
                      nowrap="nowrap">
                      {{ passage.gosnum }}{{ passage.regnum }}
                    </td>
                    <td style="vertical-align: top; text-align: center">
                      {{ passage.speed }}
                    </td>
                    <td>
                      <v-img
                        v-if="passage.image"
                        width="60px"
                        height="60px"
                        :src="`/api/image/${passage.image.name}`"
                        style="cursor: pointer" />
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
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRoute } from 'vue-router'
  import _ from 'lodash'
  import { useObjectsStore } from '@/stores/objects'
  import { utilsStore } from '@/stores/utils'
  import type { Object, Channel, Group } from '@/interfaces/object'
  import type Amts from '@/interfaces/amts'
  const route = useRoute()
  const store = useObjectsStore()
  const utils = utilsStore()

  const object = ref(<Object>(<unknown>{
    groups: [],
  }))
  const stream = ref(<EventSource>{})

  onMounted(async () => {
    const { data } = await store.getObjectInfoById(route.params.id)
    object.value = data
    for (let group of object.value.groups) {
      const { data } = await store.getGroupInfoById(group.id)
      for (const channel of data.channels) {
        const { data } = await store.getLastAmtsByChannelId(channel.id)
        channel.passages = data.data
      }
      Object.assign(group, data)
    }
    connectRedis(`?objects=[${route.params.id}]`)
  })

  onUnmounted(() => {
    stream.value.close()
  })

  const chunkedChannels = computed<Channel[]>(() => {
    const chunks: Channel[] = []
    object.value.groups.map((g: Group) => {
      if (g.channels && g.channels.length) {
        g.channels.map((c: Channel) => {
          c.group = g
          chunks.push(c)
        })
      }
    })
    return _.chunk(chunks, 4)
  })

  const parseAmts = (amts: Amts) => {
    if (amts.db_channel_id) {
      const group = object.value.groups.find((g: Group) => {
        return g.id === amts.group_id
      })
      if (group) {
        const channel = group.channels.find((c) => {
          return c.id === amts.db_channel_id
        })
        if (channel) {
          const passage: Amts = {
            fixation_time: amts.fixation_time,
            gosnum: amts.gosnum,
            speed: +amts.speed.toFixed(3),
            image: {
              name: amts.image.name,
            },
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
    }
  }

  const connectRedis = (params: string) => {
    stream.value = new EventSource(`/events${params}`)
    stream.value.onmessage = function (event) {
      parseAmts(JSON.parse(event.data))
    }
    stream.value.onerror = function () {
      console.log('error')
      // setTimeout(connectToRedis, 10000);
    }
  }
</script>
