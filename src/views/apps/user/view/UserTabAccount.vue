<script lang="ts" setup>
import { VDataTable } from 'vuetify/labs/VDataTable';

// Images

// Project Table Header
const projectTableHeaders = [
  { title: 'PROJECT', key: 'name' },
  { title: 'TOTAL TASK', key: 'totalTask' },
  { title: 'PROGRESS', key: 'progress' },
  { title: 'HOURS', key: 'hours' },
]

const search = ref('')

const headers = [
  { title: 'Действующий', sortable: false, key: 'Действующий' },
  { title: 'Филиал', key: 'филиал' },
  { title: 'Телефон', key: 'телефон' },
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Список филиалов">
        <VDataTable
          :headers="headers"
          :items="data"
        />
        <VDivider />
      </VCard>
    </VCol>
  </VRow>
</template>
