<script setup lang="ts">
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faPenToSquare, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '@/utils/dateFormaters';

import { useArticleStore } from '@/stores/article';
import { useUserStore } from '@/stores/user';
import { useModalStore } from '@/stores/modal';

const router = useRouter();
const articleStore = useArticleStore();
const userStore = useUserStore();
const modalStore = useModalStore()

const props = defineProps({
  dateOptions: {
    type: Object,
    required: false
  }
})

const handleDeleteArticle = () => {
  modalStore.open('Удалить статью?', async () => {
    const response = await articleStore.deleteArticle();
    if (!response.error) {
      router.push('/')
    }
  })
}
</script>

<template>
  <div class="bg-white rounded-md shadow-md p-8 mb-8">
    <div class="mb-4">
      <img class="w-full rounded-md h-64 object-cover" :src="articleStore.article.imageUrl" alt="">
    </div>
    <p class="text-gray-600 mb-4">
      <FontAwesomeIcon :icon="faCalendar" />
      &nbsp;
      <time :datetime="articleStore.article.publishedAt">{{ formatDate(articleStore.article.publishedAt,
        props.dateOptions) }}</time>
    </p>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-3xl">{{ articleStore.article.title }}</h1>
      <div v-if="userStore.isAdmin" class="flex gap-4 text-xl">
        <button @click="articleStore.toggleEditMode" type="button" class="cursor-pointer hover:text-blue-500"
          aria-label="Редактировать статью">
          <FontAwesomeIcon :icon="faPenToSquare" />
        </button>
        <button type="button" class="cursor-pointer hover:text-red-500" aria-label="Удалить статью"
          @click="handleDeleteArticle">
          <FontAwesomeIcon :icon="faTrash" />
        </button>
      </div>
    </div>
    <div class="whitespace-pre-wrap">
      {{ articleStore.article.content }}
    </div>
  </div>
</template>
