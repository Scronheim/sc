<template>
  <v-row>
    <v-col>
      <v-card flat>
        <v-card-title>
          Настройки карты
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-content-save"
                variant="text"
                color="success" />
            </template>
            <span>Сохранить</span>
          </v-tooltip>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field
                label="Широта по умолчанию"
                v-model="store.settings['map.default_lat']" />
            </v-col>
            <v-col>
              <v-text-field
                label="Долгота по умолчанию"
                v-model="store.settings['map.default_lon']" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10">
              <v-text-field
                label="URL tile-сервера"
                v-model="store.settings['map.tile_url']" />
            </v-col>
            <v-col>
              <v-text-field
                label="Увеличение"
                type="number"
                v-model.number="store.settings['map.default_zoom']" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            variant="outlined"
            color="success">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col>
      <v-card flat>
        <v-card-title>
          Настройки идентификаторов
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-content-save"
                variant="text"
                color="success" />
            </template>
            <span>Сохранить</span>
          </v-tooltip>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field
                label="ID объекта"
                type="number"
                v-model.number="store.settings['place.id.cross']" />
            </v-col>
            <v-col>
              <v-text-field
                label="ID системы"
                type="number"
                v-model.number="store.settings['place.id.system']" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            variant="outlined"
            color="success">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col>
      <v-card flat>
        <v-card-title>
          Настройки местоположения
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-content-save"
                variant="text"
                color="success" />
            </template>
            <span>Сохранить</span>
          </v-tooltip>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field
                label="Регион"
                variant="plain"
                v-model.number="store.settings['agglomeration']" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            variant="outlined"
            color="success">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { settingsStore } from '@/stores/settings'
const store = settingsStore()
store.getSettings()
</script>
