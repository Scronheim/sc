<template>
  <v-dialog v-model="visible">
    <v-card>
      <v-card-title>Подтверждение действия</v-card-title>
      <v-card-text>
        {{ text }}
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="error" @click="no">Нет</v-btn>
        <v-btn color="success" @click="yes">Да</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue'
  const props = defineProps({
    visible: Boolean,
    text: String,
  })

  const emit = defineEmits(['yes', 'no'])

  const yes = () => {
    emit('yes')
  }
  const no = () => {
    emit('no')
  }
</script>

<style scoped></style>
