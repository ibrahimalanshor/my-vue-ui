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
      return 'ui-leading-tight ui-text-gray-500 ui-bg-white ui-border-gray-300 hover:ui-bg-gray-100 hover:ui-text-gray-700 ui-cursor-pointer';
    });

    const numberActiveClass = computed(() => {
      return 'ui-text-blue-600 ui-bg-blue-50 hover:ui-bg-blue-100 ui-border-blue-300 hover:ui-bg-blue-100 hover:ui-text-blue';
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
    <ul class="ui-inline-flex -ui-space-x-px">
      <li v-if="hasPrev">
        <component
          :is="disabledPrev ? 'span' : 'a'"
          v-on:click="handleClickPrev"
          class="ui-py-2 ui-px-3 ui-ml-0 ui-leading-tight ui-text-gray-500 ui-rounded-l-lg ui-border ui-border-gray-300 hover:ui-bg-gray-100 hover:ui-text-gray-700"
          :class="[
            disabledPrev ? 'ui-bg-gray-100' : 'ui-cursor-pointer ui-bg-white',
          ]"
          >Previous</component
        >
      </li>
      <li v-for="number in size" :key="number">
        <component
          :is="number == active ? 'span' : 'a'"
          v-on:click="handleClickItem(number)"
          class="ui-py-2 ui-px-3 ui-border"
          :class="[
            number == active ? numberActiveClass : numberClass,
            number == 1 && !hasPrev ? 'ui-rounded-l-lg' : '',
            number == size && !hasNext ? 'ui-rounded-r-lg' : '',
          ]"
          >{{ number }}</component
        >
      </li>
      <li v-if="hasNext">
        <component
          :is="disabledNext ? 'span' : 'a'"
          v-on:click="handleClickNext"
          class="ui-py-2 ui-px-3 ui-ml-0 ui-leading-tight ui-text-gray-500 ui-rounded-r-lg ui-border ui-border-gray-300 hover:ui-bg-gray-100 hover:ui-text-gray-700"
          :class="[
            disabledNext ? 'ui-bg-gray-100' : 'ui-cursor-pointer ui-bg-white',
          ]"
          >Next</component
        >
      </li>
    </ul>
  </nav>
</template>
