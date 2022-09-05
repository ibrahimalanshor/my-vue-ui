<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'default',
  },
});

const badgeClass = computed(() => {
  const bgColors = {
    default: 'bg-gray-100',
    primary: 'bg-blue-100',
    success: 'bg-green-100',
    warning: 'bg-yellow-100',
    error: 'bg-red-100',
  };

  const textColors = {
    default: 'text-gray-800',
    primary: 'text-blue-800',
    success: 'text-green-800',
    warning: 'text-yellow-800',
    error: 'text-red-800',
  };

  const bgClass = bgColors[props.color] ?? bgColors.default;
  const textClass = textColors[props.color] ?? textColors.default;

  return [bgClass, textClass];
});
</script>

<template>
  <span class="text-xs font-semibold mr-2 px-2.5 py-0.5" :class="badgeClass">{{
    props.label
  }}</span>
</template>
