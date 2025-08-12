<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faFloppyDisk, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { useArticleStore } from '@/stores/article';
import { useModalStore } from '@/stores/modal';

const router = useRouter();
const modalStore = useModalStore()
const articleStore = useArticleStore();
const editedArticle = ref({ ...articleStore.article })

const handleArticleUpdate = async () => {
  try {
    const response = await articleStore.updateArticle(editedArticle.value)
    if (response === 'success') {
      articleStore.toggleEditMode()
    }
  } catch (error) {
    console.error(error)
  }
}

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
  <form class="bg-white rounded-md shadow-md p-8 mb-8" @submit.prevent="handleArticleUpdate">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-3xl">Редактировать статью</h1>
      <div class="flex gap-4 text-xl">
        <button type="button" @click="articleStore.toggleEditMode" class="cursor-pointer hover:text-blue-500"
          aria-label="Отменить изменения">
          <FontAwesomeIcon :icon="faArrowRotateLeft" />
        </button>
        <button type="submit" class="cursor-pointer hover:text-blue-500" aria-label="Сохранить статью">
          <FontAwesomeIcon :icon="faFloppyDisk" />
        </button>
        <button type="button" class="cursor-pointer hover:text-red-500" aria-label="Удалить статью"
          @click="handleDeleteArticle">
          <FontAwesomeIcon :icon="faTrash" />
        </button>
      </div>
    </div>

    <p class="mb-4">
      <input class="w-full border border-gray-300 rounded-md p-2" type="text" v-model="editedArticle.imageUrl"
        placeholder="URL изображения">
    </p>

    <p class="mb-4">
      <input class="w-full border border-gray-300 rounded-md p-2" type="text" v-model="editedArticle.title"
        placeholder="Заголовок статьи">
    </p>

    <p class="mb-4">
      <textarea class="w-full border border-gray-300 rounded-md p-2" rows="15" v-model="editedArticle.content"
        placeholder="Содержание статьи"></textarea>
    </p>
  </form>
</template>
