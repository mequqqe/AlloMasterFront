<script lang="ts" setup>
import { VDataTable } from 'vuetify/labs/VDataTable';

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

const headers1 = [
  { title: 'фото', key: 'photo' },
  { title: 'сотрудник', key: 'name' },
  { title: 'Телефон', key: 'phone' },
  { title: 'роль', key: 'role' },
  { title: 'филиал', key: 'branch' },
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
  <VRow>
    Список Сотрдуников
    <VDataTable
    :headers="headers1"
    :items="data"
    :items-per-page="5"
  >
    <!-- full name -->
    <template #item.fullName="{ item }">
   
      <div class="d-flex align-center">
        <VAvatar
          size="32"
          :color="item.avatar ? '' : 'primary'"
          :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
          :variant="!item.avatar ? 'tonal' : undefined"
        >
          <VImg
            v-if="item.avatar"
            :src="item.avatar"
          />
          <span v-else>{{ avatarText(item.fullName) }}</span>
        </VAvatar>
        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.fullName }}</span>
          <small>{{ item.post }}</small>
        </div>
      </div>
    </template>
  </VDataTable>
  </VRow>
</template>
