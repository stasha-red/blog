<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ref, watch } from 'vue';

import ButtonBase from './ButtonBase.vue';

const searchQuery = ref('');

const props = defineProps({
  onSearch: {
    type: Function,
    required: true
  }
})

let deboucedTimer: ReturnType<typeof setTimeout> | undefined;

const handlerSearch = () => {
  clearTimeout(deboucedTimer);
  props.onSearch({ search: searchQuery.value })
}

const debouncedSearch = (query: string) => {
  clearTimeout(deboucedTimer);

  deboucedTimer = setTimeout(() => {
    props.onSearch({ search: query })
  }, 2000)
}

watch(searchQuery, (newQuery) => {
  debouncedSearch(newQuery)
})
</script>

<template>
  <form @submit.prevent="handlerSearch" class="mt-12 relative">
    <input type="text" class="pr-20 bg-white border border-gray-300 w-full rounded-md p-2" name="search"
      placeholder="Поиск по блогу" v-model="searchQuery">
    <ButtonBase type="submit" class="absolute right-0 top-0">
      <FontAwesomeIcon :icon="faMagnifyingGlass" />
    </ButtonBase>
  </form>
</template>
