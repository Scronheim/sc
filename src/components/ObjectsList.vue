<template>
  <v-row>
    <v-col cols="7">
      <v-list nav density="compact" v-model:opened="opened">
        <v-list-group v-for="object in objects">
          <template v-slot:activator="{ props }">
            <v-list-item
              @click="getObjectInfo(object.id)"
              active-color="primary"
              v-bind="props"
              :title="`${object.object_name} (${object.id})`"/>
          </template>

          <v-list-group v-for="group in object.groups">
            <template v-slot:activator="{ props }">
              <v-list-item
                @click="getGroupInfo(group.id)"
                active-color="primary"
                v-bind="props"
                :title="`${group.group_name} (${group.id})`"
                :value="group.id" />
            </template>

            <v-list-item
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
  import { objectsStore } from '@/stores/objects'
  import ObjectForm from '@/components/objects/ObjectForm.vue'
  import GroupForm from '@/components/objects/GroupForm.vue'

  defineProps({
    objects: Array,
  })

  const store = objectsStore()
  const opened = ref([])
  const activeComponent = shallowRef('')
  const currentItem = ref({})
  const isEdit = ref(true)

  const getObjectInfo = async (objectId: number) => {
    activeComponent.value = ObjectForm
    const {data} = await store.getObjectInfoById(objectId)
    isEdit.value = true
    currentItem.value = data
  }

  const getGroupInfo = async (groupId: number) => {
    activeComponent.value = GroupForm
    const {data} = await store.getGroupInfoById(groupId)
    isEdit.value = true
    currentItem.value = data
  }
</script>

<style scoped></style>
