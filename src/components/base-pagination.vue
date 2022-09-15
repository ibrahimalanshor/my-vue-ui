<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'base-pagination',
  props: {
    hasPrev: {
      type: Boolean,
      default: true,
    },
    hasNext: {
      type: Boolean,
      default: true,
    },
    disabledPrev: {
      type: Boolean,
      default: false,
    },
    disabledNext: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      required: true,
    },
    active: Number,
  },
  emits: ['prev', 'next', 'click-item'],
  setup(props, { emit }) {
    const numberClass = computed(() => {
      return 'leading-tight text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer';
    });

    const numberActiveClass = computed(() => {
      return 'text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-300 hover:bg-blue-100 hover:text-blue';
    });

    const handleClickPrev = () => emit('prev');
    const handleClickNext = () => emit('next');
    const handleClickItem = (item) => emit('click-item', item);

    return {
      numberClass,
      numberActiveClass,
      handleClickPrev,
      handleClickNext,
      handleClickItem,
    };
  },
});
</script>

<template>
  <nav>
    <ul class="inline-flex -space-x-px">
      <li v-if="hasPrev">
        <component
          :is="disabledPrev ? 'span' : 'a'"
          v-on:click="handleClickPrev"
          class="py-2 px-3 ml-0 leading-tight text-gray-500 rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          :class="[disabledPrev ? 'bg-gray-100' : 'cursor-pointer bg-white']"
          >Previous</component
        >
      </li>
      <li v-for="number in size" :key="number">
        <component
          :is="number == active ? 'span' : 'a'"
          v-on:click="handleClickItem(number)"
          class="py-2 px-3 border"
          :class="[
            number == active ? numberActiveClass : numberClass,
            number == 1 && !hasPrev ? 'rounded-l-lg' : '',
            number == size && !hasNext ? 'rounded-r-lg' : '',
          ]"
          >{{ number }}</component
        >
      </li>
      <li v-if="hasNext">
        <component
          :is="disabledNext ? 'span' : 'a'"
          v-on:click="handleClickNext"
          class="py-2 px-3 ml-0 leading-tight text-gray-500 rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          :class="[disabledNext ? 'bg-gray-100' : 'cursor-pointer bg-white']"
          >Next</component
        >
      </li>
    </ul>
  </nav>
</template>
