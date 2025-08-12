<script setup lang="ts">
import ButtonBase from '@/components/base/ButtonBase.vue';
import { useArticleStore } from '@/stores/article';
import { ref } from 'vue';

const articleStore = useArticleStore();

const newComment = ref('')
const errorMessage = ref('')

const handleCommentSubmit = async () => {
  errorMessage.value = '';

  if (!newComment.value.trim()) {
    errorMessage.value = 'Комментарий не может быть пустым';
    return;
  }

  const response = await articleStore.addComment(newComment.value);
  if (response.error) {
    errorMessage.value = response.error
  } else {
    newComment.value = ''
  }
}

</script>


<template>
  <form class="bg-white shadow-md rounded-ms p-6 mb-8" @submit.prevent="handleCommentSubmit">
    <label for="newComment" class="block text-gray-700">Ваш комментарий</label>
    <textarea v-model="newComment" id="newComment" class="border border-gray-300 w-full rounded-md p-2 mb-4"></textarea>
    <div class="flex justify-between">
      <p class="text-red-500" v-if="errorMessage">{{ errorMessage }}</p>
      <ButtonBase type="submit" class="w-xs ml-auto">Отправить</ButtonBase>
    </div>
  </form>
</template>
