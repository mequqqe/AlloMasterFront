<script setup lang="ts">
import type { HelpCenterCategoriesType } from "@/@fake-db/types";

interface Props {
  categories: HelpCenterCategoriesType[];
}

const props = defineProps<Props>();

const totalArticles = (category: HelpCenterCategoriesType) => {
  return category.subCategories
    .map((subCategory) => subCategory.articles.length)
    .reduce((partialSum, a) => partialSum + a, 0);
};
</script>

<template>
  <VRow>
    <VCol cols="12" lg="10" class="mx-auto mb-8">
      <VRow>
        <VCol
          v-for="article in props.categories"
          :key="article.title"
          cols="12"
          sm="6"
          md="4"
        >
          <VCard>
            <template #title>
              <span class="text-h5">
                {{ article.title }}
              </span>
            </template>
            <template #prepend>
              <VAvatar
                :icon="article.icon"
                rounded
                :color="article.avatarColor"
                variant="tonal"
              />
            </template>

            <VCardText>
              <ul class="ps-6">
                <li
                  v-for="item in article.subCategories"
                  :key="item.title"
                  class="text-primary mb-2"
                >
                  <RouterLink
                    :to="{
                      name: 'pages-help-center-category-subcategory',
                      params: {
                        category: article.slug,
                        subcategory: item.slug,
                      },
                    }"
                  >
                    {{ item.title }}
                  </RouterLink>
                </li>
              </ul>

              <div class="mt-4">
                <RouterLink
                  :to="{
                    name: 'pages-help-center-category-subcategory',
                    params: {
                      category: article.slug,
                      subcategory: article.subCategories[0].slug,
                    },
                  }"
                  class="text-base font-weight-medium"
                >
                  {{ totalArticles(article) }} articles
                </RouterLink>
              </div>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
