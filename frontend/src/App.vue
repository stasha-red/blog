<script setup lang="ts">
import { RouterView } from 'vue-router'
import LayoutHeader from './components/layout/LayoutHeader.vue';
import LayoutFooter from './components/layout/LayoutFooter.vue';
import ModalBase from './components/base/ModalBase.vue';
import AccessDeniedView from './views/AccessDeniedView.vue';

import { useRoute } from 'vue-router';
import { useUserStore } from './stores/user';
import { computed } from 'vue';

const route = useRoute();
const userStore = useUserStore();

const canAccess = computed(() => {
  if (route.meta?.requireAdmin) {
    if (userStore.isAdmin) {
      return true
    } else {
      return false
    }
  }
  return true
})

</script>

<template>
  <div class="bg-gray-100 w-full min-h-screen flex flex-col">
    <header class="bg-white fixed top-0 left-0 right-0 z-10">
      <LayoutHeader />
    </header>
    <main class="flex-1 mt-26">
      <RouterView v-if="canAccess" />
      <AccessDeniedView v-else />
    </main>
    <footer class="bg-white">
      <LayoutFooter />
    </footer>
    <ModalBase />
  </div>
</template>
