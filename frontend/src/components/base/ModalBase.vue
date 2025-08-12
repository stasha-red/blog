<script setup lang="ts">
import { useModalStore } from '@/stores/modal';

const modalStore = useModalStore();
</script>

<template>
  <div v-show="modalStore.isVisible" class="fixed left-0 right-0 top-0 bottom-0 z-50">
    <div class="fixed left-0 right-0 top-0 bottom-0  bg-black opacity-50" @click="modalStore.close"></div>

    <div class="bg-white rounded-md p-8 top-50 relative w-lg mx-auto">
      <p class="text-center mt-4 mb-8">{{ modalStore.message }}</p>

      <div class="flex gap-4 justify-end">
        <button type="button" class="cursor-pointer text-gray-600 bg-gray-100 rounded-md py-2 px-4 hover:bg-gray-200"
          @click="modalStore.close">Отмена</button>
        <button type="button" class="cursor-pointer bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-700"
          @click="modalStore.confirm">Да</button>
      </div>
    </div>
  </div>
</template>
