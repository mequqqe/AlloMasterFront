<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VCol, VDataTable, VDialog, VDivider, VRow, VTextField } from 'vuetify/labs/VDataTable';

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

// Переменные для формы добавления сотрудника
const name = ref('');
const mail = ref('');
const phoneNumber = ref('');
const password = ref('');
const branchId = ref(0);
const roleId = ref(0);
const dialog = ref(false);

const addEmployee = async () => {
  if (token) {
    try {
      const response = await fetch('http://localhost:5070/api/Employees', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          branchId: branchId.value,
          name: name.value,
          mail: mail.value,
          phoneNumber: phoneNumber.value,
          password: password.value,
          roleId: roleId.value
        })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Employee added:', data) // Логируем данные для проверки
        // Обновить список сотрудников после добавления
        fetchEmployees()
        // Закрыть диалоговое окно и очистить форму
        dialog.value = false;
        name.value = '';
        mail.value = '';
        phoneNumber.value = '';
        password.value = '';
        branchId.value = 0;
        roleId.value = 0;
      } else {
        console.error('Failed to add employee')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  } else {
    console.error('Token not found in localStorage')
  }
}
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
        <VCardActions>
          <VBtn @click="dialog = true">Добавить сотрудника</VBtn>
        </VCardActions>
      </VCard>
    </VCol>
  </VRow>
  <VDialog v-model="dialog" max-width="600">
    <VCard>
      <VCardTitle>
        <span class="headline">Добавить сотрудника</span>
      </VCardTitle>
      <VCardText>
        <VForm>
          <VTextField label="Имя" v-model="name" />
          <VTextField label="Эл. почта" v-model="mail" />
          <VTextField label="Телефон" v-model="phoneNumber" />
          <VTextField label="Пароль" v-model="password" type="password" />
          <VTextField label="ID Филиала" v-model="branchId" type="number" />
          <VTextField label="ID Роли" v-model="roleId" type="number" />
        </VForm>
      </VCardText>
      <VCardActions>
        <VBtn color="blue darken-1" text @click="dialog = false">Отмена</VBtn>
        <VBtn color="blue darken-1" text @click="addEmployee">Добавить</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.75rem;
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>
