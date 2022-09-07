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
        default: 'bg-gray-100',
        primary: 'bg-blue-100',
        error: 'bg-red-100',
        success: 'bg-green-100',
        warning: 'bg-yellow-100',
      };

      const bgColorClass = bgColors[props.color] ?? bgColors.default;

      return [bgColorClass];
    });

    const iconClass = computed(() => {
      const textColors = {
        default: 'text-gray-800',
        primary: 'text-blue-800',
        error: 'text-red-800',
        success: 'text-green-800',
        warning: 'text-yellow-800',
      };

      const baseClass = 'flex-shrink-0 w-5 h-5 mr-3';
      const textColorClass = textColors[props.color] ?? textColors.default;

      return [baseClass, textColorClass];
    });

    const textClass = computed(() => {
      const textColors = {
        default: 'text-gray-700',
        primary: 'text-blue-700',
        error: 'text-red-700',
        success: 'text-green-700',
        warning: 'text-yellow-700',
      };

      const textColorClass = textColors[props.color] ?? textColors.default;

      return [textColorClass];
    });

    const closeClass = computed(() => {
      const bgColors = {
        default:
          'bg-gray-100 focus:ring-2 focus:ring-gray-400 hover:bg-gray-200',
        primary:
          'bg-blue-100 focus:ring-2 focus:ring-blue-400 hover:bg-blue-200',
        error: 'bg-red-100 focus:ring-2 focus:ring-red-400 hover:bg-red-200',
        success:
          'bg-green-100 focus:ring-2 focus:ring-success-400 hover:bg-success-200',
        warning:
          'bg-yellow-100 focus:ring-2 focus:ring-yellow-400 hover:bg-yellow-200',
      };
      const textColors = {
        default: 'text-gray-500',
        primary: 'text-blue-500',
        error: 'text-red-500',
        success: 'text-green-500',
        warning: 'text-yellow-500',
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
    class="flex p-4 mb-4 rounded-lg"
    :class="alertClass"
    role="alert"
    v-if="visible"
  >
    <slot name="icon" :icon-class="iconClass" />
    <div class="text-sm font-medium" :class="textClass">{{ text }}</div>
    <button
      type="button"
      v-on:click="handleClickClose"
      class="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8"
      :class="closeClass"
      aria-label="Close"
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
