<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          Настройки карты
          <v-btn icon size="small" variant="outlined" color="success">
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field label="Широта по умолчанию" variant="plain" v-model="store.settings['map.default_lat']"/>
            </v-col>
            <v-col>
              <v-text-field label="Долгота по умолчанию" variant="plain" v-model="store.settings['map.default_lon']"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col :cols="10">
              <v-text-field label="URL tile-сервера" variant="plain" v-model="store.settings['map.tile_url']"/>
            </v-col>
            <v-col>
              <v-text-field label="Увеличение" type="number" variant="plain" v-model.number="store.settings['map.default_zoom']"/>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>
          Настройки идентификаторов
          <v-btn icon size="small" variant="outlined" color="success">
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text> </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>
          Настройки местоположения
          <v-btn icon size="small" variant="outlined" color="success">
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text> </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { settingsStore } from '@/stores/settings'
const store = settingsStore()
store.getSettings()
</script>
