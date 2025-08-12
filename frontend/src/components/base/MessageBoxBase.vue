<script setup lang="ts">

const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value: string) => ['error', 'success', 'warning', 'info'].includes(value)
  }
})

const errorClass = 'text-red-500';
const successClass = 'text-green-500';
const warningClass = 'text-yellow-500';
const infoClass = 'text-blue-500';

const getClass = () => {
  switch (props.type) {
    case 'error':
      return errorClass;
    case 'success':
      return successClass;
    case 'warning':
      return warningClass;
    case 'info':
      return infoClass;
    default:
      return ''
  }
}
</script>

<template>
  <div :class="getClass()" class="py-2">
    <slot></slot>
  </div>
</template>
