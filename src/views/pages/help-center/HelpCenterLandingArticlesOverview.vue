<script setup lang="ts">
import type { HelpCenterArticlesOverviewType } from "@/@fake-db/types";

interface Props {
  articles: HelpCenterArticlesOverviewType[];
}

const props = defineProps<Props>();
</script>

<template>
  <VRow>
    <VCol cols="12" lg="10" class="mx-auto mb-8">
      <VRow>
        <VCol
          v-for="article in props.articles"
          :key="article.title"
          cols="12"
          md="4"
        >
          <VCard flat border>
            <VCardText class="text-center">
              <VImg
                :src="article.img"
                aspect-ratio="1"
                width="58"
                class="mx-auto"
              />

              <h6 class="text-h5 my-3">
                {{ article.title }}
              </h6>
              <p class="clamp-text">
                {{ article.subtitle }}
              </p>

              <VBtn
                size="small"
                variant="tonal"
                :to="{
                  name: 'pages-help-center-category-subcategory-article',
                  params: {
                    category: 'getting-started',
                    subcategory: 'account',
                    article: 'changing-your-username',
                  },
                }"
              >
                Read More
              </VBtn>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
