<script setup lang="ts">
import LayoutContainer from '@/components/layout/LayoutContainer.vue';
import SearchBase from '@/components/base/SearchBase.vue';
import ArticlesList from '@/components/ArticlesList.vue';
import PaginationBase from '@/components/base/PaginationBase.vue';

import { useArticlesStore } from '@/stores/articles';
const articlesStore = useArticlesStore();
</script>

<template>
  <LayoutContainer>
    <SearchBase :on-search="articlesStore.fetchArticles" />
    <ArticlesList />
    <PaginationBase v-if="articlesStore.totalPage > 1" :current-page="articlesStore.currentPage"
      :total-page="articlesStore.totalPage" :on-page-changes="articlesStore.fetchArticles" />
  </LayoutContainer>
</template>
