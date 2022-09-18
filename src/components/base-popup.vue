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
      return 'ui-mx-auto ui-mb-4 ui-w-14 ui-h-14 ui-text-gray-400';
    });
    const contentClass = computed(() => {
      return 'ui-mb-5 ui-text-lg ui-font-normal ui-text-gray-500';
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
      class="ui-overflow-y-auto ui-overflow-x-hidden ui-fixed ui-top-0 ui-right-0 ui-left-0 ui-z-50 ui-w-full md:ui-inset-0 ui-h-full ui-flex ui-justify-center ui-items-center ui-bg-gray-500 ui-bg-opacity-50"
    >
      <div
        class="ui-relative ui-p-4 ui-w-full ui-max-w-md ui-h-full md:ui-h-auto"
        v-click-outside="handleClickOutside"
      >
        <div class="ui-relative ui-bg-white ui-rounded-lg ui-shadow">
          <button
            v-on:click="handleClickClose"
            type="button"
            class="ui-absolute ui-top-3 ui-right-2.5 ui-text-gray-400 ui-bg-transparent hover:ui-bg-gray-200 hover:ui-text-gray-900 ui-rounded-lg ui-text-sm ui-p-1.5 ui-ml-auto ui-inline-flex ui-items-center"
            data-modal-toggle="popup-modal"
          >
            <svg
              aria-hidden="true"
              class="ui-w-5 ui-h-5"
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
          <div class="ui-p-6 ui-text-center">
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
