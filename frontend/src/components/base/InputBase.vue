<script setup lang="ts">
import { Field } from 'vee-validate'

defineProps<{
  name: string
}>()
</script>

<template>
  <Field :name="name" class="bg-white border border-gray-300 w-full rounded-md p-2"></Field>
</template>
