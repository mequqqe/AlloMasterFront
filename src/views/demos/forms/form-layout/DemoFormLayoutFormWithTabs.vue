<script lang="ts" setup>
const tab = ref("personal-info");
const firstName = ref("");
const lastName = ref("");
const country = ref();
const birthDate = ref("");
const phoneNo = ref<number>();
const countryList = [
  "USA",
  "Canada",
  "UK",
  "Denmark",
  "Germany",
  "Iceland",
  "Israel",
  "Mexico",
];
const languageList = [
  "English",
  "German",
  "French",
  "Spanish",
  "Portuguese",
  "Russian",
  "Korean",
] as const;
const username = ref("");
const email = ref("");
const password = ref("");
const cPassword = ref("");
const twitterLink = ref("");
const facebookLink = ref("");
const googlePlusLink = ref("");
const linkedInLink = ref("");
const instagramLink = ref("");
const quoraLink = ref("");
const languages = ref<(typeof languageList)[number][]>([]);
const isPasswordVisible = ref(false);
const isCPasswordVisible = ref(false);
</script>

<template>
  <VTabs v-model="tab">
    <VTab value="personal-info"> Personal Info </VTab>
    <VTab value="account-details"> Account Details </VTab>
    <VTab value="social-links"> Social Links </VTab>
  </VTabs>

  <VCard flat>
    <VCardText>
      <VWindow v-model="tab" class="disable-tab-transition">
        <VWindowItem value="personal-info">
          <VForm class="mt-2">
            <VRow>
              <VCol md="6" cols="12">
                <AppTextField v-model="firstName" label="First name" />
              </VCol>

              <VCol md="6" cols="12">
                <AppTextField v-model="lastName" label="Last name" />
              </VCol>

              <VCol cols="12" md="6">
                <AppSelect
                  v-model="country"
                  :items="countryList"
                  label="Country"
                />
              </VCol>

              <VCol cols="12" md="6">
                <AppSelect
                  v-model="languages"
                  :items="languageList"
                  multiple
                  chips
                  clearable
                  label="Language"
                />
              </VCol>
              <VCol cols="12" md="6">
                <AppTextField
                  v-model="birthDate"
                  label="Birth Date"
                  placeholder="YYYY-MM-DD"
                />
              </VCol>
              <VCol cols="12" md="6">
                <AppTextField
                  v-model="phoneNo"
                  type="number"
                  label="Phone No."
                />
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem value="account-details">
          <VForm class="mt-2">
            <VRow>
              <VCol cols="12" md="6">
                <AppTextField v-model="username" label="Username" />
              </VCol>

              <VCol cols="12" md="6">
                <AppTextField
                  v-model="email"
                  label="Email"
                  suffix="@example.com"
                />
              </VCol>

              <VCol cols="12" md="6">
                <AppTextField
                  v-model="password"
                  label="Password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye' : 'tabler-eye-off'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol cols="12" md="6">
                <AppTextField
                  v-model="cPassword"
                  label="Confirm Password"
                  :type="isCPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isCPasswordVisible ? 'tabler-eye' : 'tabler-eye-off'
                  "
                  @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                />
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem value="social-links">
          <VForm class="mt-2">
            <VRow>
              <VCol cols="12" md="6">
                <AppTextField v-model="twitterLink" label="Twitter" />
              </VCol>
              <VCol cols="12" md="6">
                <AppTextField v-model="facebookLink" label="Facebook" />
              </VCol>
              <VCol cols="12" md="6">
                <AppTextField v-model="googlePlusLink" label="Google+" />
              </VCol>
              <VCol cols="12" md="6">
                <AppTextField v-model="linkedInLink" label="LinkedIn" />
              </VCol>
              <VCol cols="12" md="6">
                <AppTextField v-model="instagramLink" label="Instagram" />
              </VCol>
              <VCol cols="12" md="6">
                <AppTextField v-model="quoraLink" label="Quora" />
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>
      </VWindow>
    </VCardText>

    <VDivider />

    <VCardText class="d-flex gap-4">
      <VBtn>Submit</VBtn>
      <VBtn color="secondary" variant="tonal"> Cancel </VBtn>
    </VCardText>
  </VCard>
</template>
