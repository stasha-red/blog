<script setup lang="ts">
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPage: {
    type: Number,
    required: true
  },
  onPageChanges: {
    type: Function,
    required: true
  }
})

const goToPage = (page: number) => {
  props.onPageChanges({ page })
}

const activeClass = "underline hover:text-blue-500 cursor-pointer";
const disabledClass = "text-gray-400";
</script>

<template>
  <ul class="flex justify-center items-center gap-4 pt-8 pb-12">
    <li>
      <button @click="goToPage(1)" :disabled="currentPage === 1"
        :class="currentPage === 1 ? disabledClass : activeClass">В начало</button>
    </li>
    <li>
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
        :class="currentPage === 1 ? disabledClass : activeClass">Предыдущая</button>
    </li>
    <li>
      {{ currentPage }}
    </li>
    <li>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPage"
        :class="currentPage === totalPage ? disabledClass : activeClass">Следующая</button>
    </li>
    <li>
      <button @click="goToPage(totalPage)" :disabled="currentPage === totalPage"
        :class="currentPage === totalPage ? disabledClass : activeClass">В
        конец</button>
    </li>
  </ul>
</template>
