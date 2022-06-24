<template>
  <v-row>
    <v-col cols="7">
      <v-list nav density="compact" v-model:opened="opened">
        <v-list-group v-for="object in objects">
          <template v-slot:activator="{ props, isOpen }">
            <v-list-item
              @click="getObjectInfo(object.id, isOpen)"
              active-color="primary"
              v-bind="props"
              :title="`${object.object_name} (${object.id})`"/>
          </template>

          <v-list-group v-for="group in object.groups">
            <template v-slot:activator="{ props }">
              <v-list-item
                @click="getGroupInfo(group, props)"
                active-color="primary"
                v-bind="props"
                :title="`${group.group_name} (${group.id})`"
                :value="group.id" />
            </template>

            <v-list-item
              @click="getChannelInfo(channel.id)"
              active-color="primary"
              v-for="channel in group.channels"
              :title="`${channel.channel_name} (${channel.id})`"
              :value.number="channel.id" />
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-col>
    <v-col>
      <component :is="activeComponent" :item="currentItem" :isEdit="isEdit"/>
    </v-col>
  </v-row>

</template>

<script setup lang="ts">
  import { ref, shallowRef, defineProps } from 'vue'
  import type { PropType, ComputedRef } from 'vue'
  import { useObjectsStore } from '@/stores/objects'
  import ObjectForm from '@/components/objects/ObjectForm.vue'
  import GroupForm from '@/components/objects/GroupForm.vue'
  import ChannelForm from '@/components/objects/ChannelForm.vue'
  import type { Channel, Group, Object } from "@/interfaces/object"

  defineProps({
    objects: {
      type: [] as PropType<Object>,
    },
  })

  const objectsStore = useObjectsStore()
  const opened = ref([])
  const activeComponent = shallowRef('')
  const currentItem = ref<Object | Group | Channel>(<Object | Group | Channel>{})
  const isEdit = ref(true)

  const getObjectInfo = async (objectId: number, isOpen: ComputedRef) => {
    if (!isOpen.value) {
      isEdit.value = true
      const object = objectsStore.objects.find((o) => o.id === objectId)
      if (object) currentItem.value = object
      activeComponent.value = ObjectForm
    }
  }

  const getGroupInfo = async (group: Group, props: object) => {
    const {data} = await objectsStore.getGroupInfoById(group.id)
    isEdit.value = true
    group.channels = data.channels
    currentItem.value = data
    activeComponent.value = GroupForm
  }

  const getChannelInfo = async (channelId: number) => {
    const {data} = await objectsStore.getChannelInfoById(channelId)
    isEdit.value = true
    currentItem.value = data
    activeComponent.value = ChannelForm
  }
</script>

<style scoped></style>
