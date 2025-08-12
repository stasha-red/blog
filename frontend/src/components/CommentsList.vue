<script setup lang="ts">
import { ref } from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faUser } from '@fortawesome/free-solid-svg-icons';

import { useArticleStore } from '@/stores/article';
import { useUserStore } from '@/stores/user';
import { useModalStore } from '@/stores/modal';

import { formatDate } from '@/utils/dateFormaters';

import MessageBoxBase from './base/MessageBoxBase.vue';

const articleStore = useArticleStore()
const userStore = useUserStore()
const modalStore = useModalStore()

const errorMessage = ref('')

const props = defineProps({
  dateOptions: {
    type: Object,
    required: false
  }
})

const handleDeleteComment = (commentId: string) => {
  errorMessage.value = '';

  modalStore.open('Удалить комментарий?', async () => {
    const response = await articleStore.deleteComment(commentId)
    if (response.error) {
      errorMessage.value = response.error
    }
  })
}
</script>

<template>
  <ul>
    <li v-for="comment in articleStore.article.comments" :key="comment.id"
      class="bg-white rounded-md shadow-md p-4 mb-4">
      <div class="flex justify-between mb-2">
        <p class="font-bold">
          <FontAwesomeIcon :icon="faUser" />
          &nbsp;
          {{ comment.author }}
        </p>
        <button v-if="userStore.isAdmin || userStore.isModerator" type="button"
          class="text-red-500 cursor-pointer hover:text-red-700" @click="handleDeleteComment(comment.id)">
          <FontAwesomeIcon :icon="faTrash" />
          &nbsp;
          Удалить
        </button>
      </div>
      <p class="text-gray-500 text-sm mb-2">
        <time :datetime="comment.publishedAt"> {{ formatDate(comment.publishedAt, props.dateOptions) }}</time>
      </p>
      <div class="whitespace-pre-wrap mb-2">
        {{ comment.content }}
      </div>
    </li>
  </ul>
  <MessageBoxBase v-if="errorMessage" type="error">{{ errorMessage }}</MessageBoxBase>
</template>
