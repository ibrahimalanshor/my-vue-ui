<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'base-collapse',
  props: {
    label: String,
  },
  setup(props) {
    const visible = ref(false);

    const handleClickLabel = () => (visible.value = !visible.value);

    return { visible, handleClickLabel };
  },
});
</script>

<template>
  <div>
    <div
      class="flex items-center justify-between"
      v-on:click="handleClickLabel"
    >
      <slot name="label">{{ label }}</slot>
      <svg
        data-accordion-icon
        class="w-6 h-6 shrink-0"
        :class="{ 'rotate-180': visible }"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
    <div v-if="visible">
      <slot />
    </div>
  </div>
</template>
