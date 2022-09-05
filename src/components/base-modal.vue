<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: String,
  header: {
    type: Boolean,
    default: true,
  },
  footer: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'close']);

const visible = ref(props.modelValue);

const titleClass = computed(() => {
  return 'text-xl font-semibold text-gray-900';
});

function close() {
  visible.value = false;

  emit('update:modelValue', visible.value);
  emit('close');
}

const handleClickClose = () => {
  close();
};
const handleClickOutside = () => {
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
  <teleport to="body" v-if="visible">
    <div
      tabindex="-1"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full flex justify-center items-center bg-gray-500 bg-opacity-50"
    >
      <div
        class="relative p-4 w-full max-w-2xl h-full md:h-auto"
        v-click-outside="handleClickOutside"
      >
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header -->
          <div
            class="flex justify-between items-center p-4 rounded-t border-b"
            v-if="props.header"
          >
            <slot name="title" :class="titleClass">
              <h3 :class="titleClass">
                {{ props.title }}
              </h3>
            </slot>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
          <!-- Modal body -->
          <div class="p-6 space-y-6 text-base leading-relaxed text-gray-500">
            <slot />
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200"
            v-if="props.footer"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
