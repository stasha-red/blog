<script setup lang="ts">
import LayoutContainer from '@/components/layout/LayoutContainer.vue';
import ArticleDetails from '@/components/ArticleDetails.vue';
import ArticleDetailsForm from '@/components/ArticleDetailsForm.vue';
import CommentsList from '@/components/CommentsList.vue';
import CommentsForm from '@/components/CommentsForm.vue';
import NotFoundView from './NotFoundView.vue';

import { onBeforeMount, ref } from 'vue';

import { useUserStore } from '@/stores/user';
import { useArticleStore } from '@/stores/article';

const userStore = useUserStore()
const articleStore = useArticleStore()
const notFound = ref(false)

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const formatDateOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
}

onBeforeMount(async () => {
  try {
    const response = await articleStore.fetchArticle(props.id);
    if (response.error) {
      notFound.value = true
    }
  } catch (error) {
    console.log(error)
    notFound.value = true
  }
})
</script>

<template>
  <NotFoundView v-if="notFound" />
  <LayoutContainer v-else class="mt-4">
    <ArticleDetailsForm v-if="articleStore.isInEditMode" />
    <ArticleDetails v-else :date-options="formatDateOptions" />
    <div v-if="!articleStore.isInEditMode && (articleStore.article?.comments?.length > 0 || userStore.isAuthorized)">
      <h2 class="text-2xl font-bold mb-4">Комментарии</h2>
      <CommentsList :date-options="formatDateOptions" />
      <CommentsForm v-if="userStore.isAuthorized" />
    </div>
  </LayoutContainer>
</template>
