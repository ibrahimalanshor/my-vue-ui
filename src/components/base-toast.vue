<script>
import { ref, computed, watch, defineComponent } from 'vue';

export default defineComponent({
  name: 'base-toast',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    withIcon: {
      type: Boolean,
      default: false,
    },
    text: String,
    color: {
      type: String,
      default: 'default',
    },
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { emit }) {
    const visible = ref(props.modelValue);

    const iconWrapperClass = computed(() => {
      const bgColors = {
        default: 'ui-bg-gray-100',
        primary: 'ui-bg-blue-100',
        success: 'ui-bg-green-100',
        warning: 'ui-bg-yellow-100',
        error: 'ui-bg-red-100',
      };

      const textColors = {
        default: 'ui-text-gray-500',
        primary: 'ui-text-blue-500',
        success: 'ui-text-green-500',
        warning: 'ui-text-yellow-500',
        error: 'ui-text-red-500',
      };

      const bgClass = props.outline
        ? bgOutlineColors[props.color] ?? bgOutlineColors.default
        : bgColors[props.color] ?? bgColors.default;
      const textClass = props.outline
        ? textOutlineColors[props.color] ?? textOutlineColors.default
        : textColors[props.color] ?? textColors.default;

      return [bgClass, textClass];
    });

    const iconClass = computed(() => {
      return 'ui-w-5 ui-h-5';
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

    return { visible, iconClass, iconWrapperClass, handleClickClose };
  },
});
</script>

<template>
  <div
    class="ui-flex ui-items-center ui-p-4 ui-w-full ui-max-w-xs ui-text-gray-500 ui-bg-white ui-rounded-lg ui-shadow ui-fixed ui-top-4 ui-left-1/2 -ui-translate-x-1/2"
    role="alert"
    v-if="visible"
  >
    <div
      class="ui-inline-flex ui-flex-shrink-0 ui-justify-center ui-items-center ui-w-8 ui-h-8 ui-rounded-lg ui-mr-3"
      :class="iconWrapperClass"
      v-if="withIcon"
    >
      <slot name="icon" :icon-class="iconClass" />
    </div>
    <div class="ui-text-sm ui-font-normal">{{ text }}</div>
    <button
      type="button"
      class="ui-ml-auto -ui-mx-1.5 -ui-my-1.5 ui-bg-white ui-text-gray-400 hover:ui-text-gray-900 ui-rounded-lg focus:ui-ring-2 focus:ui-ring-gray-300 ui-p-1.5 hover:ui-bg-gray-100 ui-inline-flex ui-h-8 ui-w-8"
      aria-label="Close"
      v-on:click="handleClickClose"
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
  </div>
</template>
