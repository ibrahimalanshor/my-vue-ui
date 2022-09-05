<script setup>
import { computed } from 'vue';

const props = defineProps({
  hasPrev: {
    type: Boolean,
    default: true,
  },
  hasNext: {
    type: Boolean,
    default: true,
  },
  size: {
    type: Number,
    required: true,
  },
  active: Number,
});
const emit = defineEmits(['prev', 'next', 'click-item']);

const numberClass = computed(() => {
  return 'leading-tight text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700';
});

const numberActiveClass = computed(() => {
  return 'text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-300 hover:bg-blue-100 hover:text-blue';
});

const handleClickPrev = () => emit('prev');
const handleClickNext = () => emit('next');
const handleClickItem = (item) => emit('click-item', item);
</script>

<template>
  <nav>
    <ul class="inline-flex -space-x-px">
      <li v-if="props.hasPrev">
        <a
          v-on:click="handleClickPrev"
          class="py-2 cursor-pointer px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          >Previous</a
        >
      </li>
      <li v-for="number in size" :key="number">
        <a
          v-on:click="handleClickItem(number)"
          class="py-2 cursor-pointer px-3 border"
          :class="[number == props.active ? numberActiveClass : numberClass]"
          >{{ number }}</a
        >
      </li>
      <li v-if="props.hasNext">
        <a
          v-on:click="handleClickNext"
          class="py-2 cursor-pointer px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          >Next</a
        >
      </li>
    </ul>
  </nav>
</template>
