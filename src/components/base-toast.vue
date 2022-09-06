<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  withIcon: {
    type: Boolean,
    default: false,
  },
  text: String,
});
const emit = defineEmits(['update:modelValue', 'close']);

const visible = ref(props.modelValue);

const iconClass = computed(() => {
  return 'w-5 h-5';
});
const contentClass = computed(() => {
  return 'mb-5 text-lg font-normal text-gray-500';
});

function close() {
  visible.value = false;

  emit('update:modelValue', visible.value);
  emit('close');
}

const handleClickClose = () => {
  close();
};

watch(
  () => props.modelValue,
  () => {
    visible.value = props.modelValue;
  }
);
</script>

<template>
  <div
    class="flex items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow fixed top-4 left-1/2 -translate-x-1/2"
    role="alert"
    v-if="visible"
  >
    <div
      class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-blue-500 bg-blue-100 rounded-lg mr-3"
      v-if="props.withIcon"
    >
      <slot name="icon" :icon-class="iconClass" />
    </div>
    <div class="text-sm font-normal">{{ props.text }}</div>
    <button
      type="button"
      class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
      aria-label="Close"
      v-on:click="handleClickClose"
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  </div>
</template>
