<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';

const headers = [
  { title: 'Действующий', sortable: false, key: 'Действующий' },
  { title: 'Филиал', key: 'branchName' },
  { title: 'Телефон', key: 'phoneNumber' },
]

const headers1 = [
  { title: 'фото', key: 'photo' },
  { title: 'сотрудник', key: 'name' },
  { title: 'Телефон', key: 'phone' },
  { title: 'роль', key: 'role' },
  { title: 'филиал', key: 'branch' },
]

const search = ref('')
const branches = ref([])

const token = localStorage.getItem('token') // assuming the token is stored with the key 'token'

const fetchBranches = async () => {
  if (token) {
    try {
      const response = await fetch('http://localhost:5070/api/Branches', {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Fetched branches:', data) // Логируем данные для проверки
        branches.value = data
      } else {
        console.error('Failed to fetch branches')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  } else {
    console.error('Token not found in localStorage')
  }
}

onMounted(fetchBranches)
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Список филиалов">
        <VDataTable
          :headers="headers"
          :items="branches"
        />
        <VDivider />
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    Список Сотрудников
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

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.75rem;
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>
