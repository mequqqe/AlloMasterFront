<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';

const headersBranches = [
  { title: 'Действующий', sortable: false, key: 'Действующий' },
  { title: 'Филиал', key: 'branchName' },
  { title: 'Телефон', key: 'phoneNumber' },
]

const headersEmployees = [
  { title: 'ID', key: 'id' },
  { title: 'Сотрудник', key: 'name' },
  { title: 'Эл. почта', key: 'mail' },
  { title: 'Телефон', key: 'phoneNumber' },
  { title: 'Роль', key: 'role' },
  { title: 'ID Филиала', key: 'branchId' },
]

const search = ref('')
const branches = ref([])
const employees = ref([])

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

const fetchEmployees = async () => {
  if (token) {
    try {
      const response = await fetch('http://localhost:5070/api/Employees', {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Fetched employees:', data) // Логируем данные для проверки
        employees.value = data
      } else {
        console.error('Failed to fetch employees')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  } else {
    console.error('Token not found in localStorage')
  }
}

onMounted(() => {
  fetchBranches()
  fetchEmployees()
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Список филиалов">
        <VDataTable
          :headers="headersBranches"
          :items="branches"
        />
        <VDivider />
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard title="Список Сотрудников">
        <VDataTable
          :headers="headersEmployees"
          :items="employees"
          :items-per-page="5"
        />
      </VCard>
    </VCol>
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

