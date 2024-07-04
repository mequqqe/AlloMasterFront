<script setup lang="ts">

interface Props {
  userData: {
    id: number
    company: string
    phone: string
    email: string
    adress: string
  }
}

const props = defineProps<Props>()

const standardPlan = {
  plan: 'Standard',
  price: 99,
  benefits: ['10 Users', 'Up to 10GB storage', 'Basic Support'],
}

const isUserInfoEditDialogVisible = ref(false)
const isUpgradePlanDialogVisible = ref(false)

// 👉 Status variant resolver
const resolveUserStatusVariant = (stat: string) => {
  if (stat === 'pending')
    return 'warning'
  if (stat === 'active')
    return 'success'
  if (stat === 'inactive')
    return 'secondary'

  return 'primary'
}

// 👉 Role variant resolver
const resolveUserRoleVariant = (role: string) => {
  if (role === 'subscriber')
    return { color: 'warning', icon: 'tabler-user' }
  if (role === 'author')
    return { color: 'success', icon: 'tabler-circle-check' }
  if (role === 'maintainer')
    return { color: 'primary', icon: 'tabler-chart-pie-2' }
  if (role === 'editor')
    return { color: 'info', icon: 'tabler-pencil' }
  if (role === 'admin')
    return { color: 'secondary', icon: 'tabler-server-2' }

  return { color: 'primary', icon: 'tabler-user' }
}
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard>
        <!-- 👉 Details -->
        <VCardText>
          <p class="text-sm text-uppercase text-disabled">
            Details
          </p>

          <!-- 👉 User Details list -->
          <VList class="card-list mt-2">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Компания:
                  <span class="text-body-1">{{ props.userData.email }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Эл. почта:
                  <span class="text-body-1">{{ props.userData.email }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Телефон
                  <span class="text-body-1">
                    {{ props.userData.taxId }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Адрес:
                  <span class="text-body-1">{{ props.userData.contact }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText class="d-flex justify-center">
          <VBtn
            variant="elevated"
            class="me-4"
            @click="isUserInfoEditDialogVisible = true"
          >
            Edit
          </VBtn>

          <VBtn
            variant="tonal"
            color="error"
          >
            Suspend
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->

    <!-- !SECTION -->
  </VRow>

  <!-- 👉 Edit user info dialog -->
  <UserInfoEditDialog
    v-model:isDialogVisible="isUserInfoEditDialogVisible"
    :user-data="props.userData"
  />

  <!-- 👉 Upgrade plan dialog -->
  <UserUpgradePlanDialog v-model:isDialogVisible="isUpgradePlanDialogVisible" />
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.75rem;
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>
