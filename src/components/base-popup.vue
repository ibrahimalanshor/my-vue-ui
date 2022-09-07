<script>
import { ref, computed, watch, defineComponent } from 'vue';

export default defineComponent({
  name: 'base-popup',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    text: String,
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { emit }) {
    const visible = ref(props.modelValue);

    const iconClass = computed(() => {
      return 'mx-auto mb-4 w-14 h-14 text-gray-400';
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
    const handleClickOutside = () => {
      close();
    };

    watch(
      () => props.modelValue,
      () => {
        visible.value = props.modelValue;
      }
    );

    return {
      visible,
      iconClass,
      contentClass,
      handleClickClose,
      handleClickOutside,
    };
  },
});
</script>

<template>
  <teleport to="body" v-if="visible">
    <div
      tabindex="-1"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full flex justify-center items-center bg-gray-500 bg-opacity-50"
    >
      <div
        class="relative p-4 w-full max-w-md h-full md:h-auto"
        v-click-outside="handleClickOutside"
      >
        <div class="relative bg-white rounded-lg shadow">
          <button
            v-on:click="handleClickClose"
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="popup-modal"
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
          <div class="p-6 text-center">
            <slot name="icon" :icon-class="iconClass">
              <svg
                aria-hidden="true"
                :class="iconClass"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </slot>
            <slot name="content" :content-class="contentClass">
              <h3 :class="contentClass">{{ text }}</h3>
            </slot>
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
