<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { VForm } from "vuetify/components/VForm";
import { emailValidator, requiredValidator } from "@validators";

const firstName = ref("");
const email = ref("");

const refForm = ref<VForm>();
</script>

<template>
  <VForm ref="refForm" @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12" md="6">
        <AppTextField
          v-model="firstName"
          label="First Name"
          :rules="[requiredValidator]"
        />
      </VCol>

      <VCol cols="12" md="6">
        <AppTextField
          v-model="email"
          label="Email"
          :rules="[requiredValidator, emailValidator]"
        />
      </VCol>

      <VCol cols="12">
        <VBtn type="submit" @click="refForm?.validate()"> Submit </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
