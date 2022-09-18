<script>
import { computed, ref, watch, defineComponent } from 'vue';

export default defineComponent({
  name: 'base-alert',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'default',
    },
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { emit }) {
    const visible = ref(props.modelValue);

    const alertClass = computed(() => {
      const bgColors = {
        default: 'ui-bg-gray-100',
        primary: 'ui-bg-blue-100',
        error: 'ui-bg-red-100',
        success: 'ui-bg-green-100',
        warning: 'ui-bg-yellow-100',
      };

      const bgColorClass = bgColors[props.color] ?? bgColors.default;

      return [bgColorClass];
    });

    const iconClass = computed(() => {
      const textColors = {
        default: 'ui-text-gray-800',
        primary: 'ui-text-blue-800',
        error: 'ui-text-red-800',
        success: 'ui-text-green-800',
        warning: 'ui-text-yellow-800',
      };

      const baseClass = 'ui-flex-shrink-0 ui-w-5 ui-h-5 ui-mr-3';
      const textColorClass = textColors[props.color] ?? textColors.default;

      return [baseClass, textColorClass];
    });

    const textClass = computed(() => {
      const textColors = {
        default: 'ui-text-gray-700',
        primary: 'ui-text-blue-700',
        error: 'ui-text-red-700',
        success: 'ui-text-green-700',
        warning: 'ui-text-yellow-700',
      };

      const textColorClass = textColors[props.color] ?? textColors.default;

      return [textColorClass];
    });

    const closeClass = computed(() => {
      const bgColors = {
        default:
          'ui-bg-gray-100 focus:ui-ring-2 focus:ui-ring-gray-400 hover:ui-bg-gray-200',
        primary:
          'ui-bg-blue-100 focus:ui-ring-2 focus:ui-ring-blue-400 hover:ui-bg-blue-200',
        error:
          'ui-bg-red-100 focus:ui-ring-2 focus:ui-ring-red-400 hover:ui-bg-red-200',
        success:
          'ui-bg-green-100 focus:ui-ring-2 focus:ui-ring-success-400 hover:ui-bg-success-200',
        warning:
          'ui-bg-yellow-100 focus:ui-ring-2 focus:ui-ring-yellow-400 hover:ui-bg-yellow-200',
      };
      const textColors = {
        default: 'ui-text-gray-500',
        primary: 'ui-text-blue-500',
        error: 'ui-text-red-500',
        success: 'ui-text-green-500',
        warning: 'ui-text-yellow-500',
      };

      const bgColorClass = bgColors[props.color] ?? bgColors.default;
      const textColorClass = textColors[props.color] ?? textColors.default;

      return [bgColorClass, textColorClass];
    });

    const handleClickClose = () => {
      visible.value = false;

      emit('update:modelValue', visible.value);
      emit('close', visible.value);
    };

    watch(
      () => props.modelValue,
      () => {
        visible.value = props.modelValue;
      }
    );

    return {
      alertClass,
      visible,
      iconClass,
      textClass,
      closeClass,
      handleClickClose,
    };
  },
});
</script>

<template>
  <div
    id="alert-1"
    class="ui-flex ui-p-4 ui-mb-4 ui-rounded-lg"
    :class="alertClass"
    role="alert"
    v-if="visible"
  >
    <slot name="icon" :icon-class="iconClass" />
    <div class="ui-text-sm ui-font-medium" :class="textClass">{{ text }}</div>
    <button
      type="button"
      v-on:click="handleClickClose"
      class="ui-ml-auto -ui-mx-1.5 -ui-my-1.5 ui-rounded-lg ui-p-1.5 ui-inline-flex ui-h-8 ui-w-8"
      :class="closeClass"
      aria-label="Close"
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
