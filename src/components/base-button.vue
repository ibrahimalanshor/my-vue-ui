<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'base-button',
  props: {
    label: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'default',
    },
    size: {
      type: String,
      default: 'default',
    },
    outline: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const buttonClass = computed(() => {
      const bgColors = {
        default:
          'ui-bg-white hover:ui-bg-gray-100 ui-border ui-border-gray-300',
        primary: 'ui-bg-blue-700 hover:ui-bg-blue-800',
        success: 'ui-bg-green-700 hover:ui-bg-green-800',
        warning: 'ui-bg-yellow-400 hover:ui-bg-yellow-500',
        error: 'ui-bg-red-700 hover:ui-bg-red-800',
      };

      const bgOutlineColors = {
        default:
          'ui-bg-white hover:ui-bg-gray-100 ui-border ui-border-gray-300',
        primary: 'ui-border ui-border-blue-700 hover:ui-bg-blue-800',
        success: 'ui-border ui-border-green-700 hover:ui-bg-green-800',
        warning: 'ui-border ui-border-yellow-400 hover:ui-bg-yellow-500',
        error: 'ui-border ui-border-red-700 hover:ui-bg-red-800',
      };

      const textColors = {
        default: 'ui-text-gray-900',
        primary: 'ui-text-white',
        success: 'ui-text-white',
        warning: 'ui-text-white',
        error: 'ui-text-white',
      };

      const textOutlineColors = {
        default: 'ui-text-gray-900 hover:ui-text-white',
        primary: 'ui-text-blue-700 hover:ui-text-white',
        success: 'ui-text-green-700 hover:ui-text-white',
        warning: 'ui-text-yellow-400 hover:ui-text-white',
        error: 'ui-text-red-700 hover:ui-text-white',
      };

      const focusColors = {
        default: ' focus:ui-ring-gray-200',
        primary: 'focus:ui-ring-blue-300',
        success: 'focus:ui-ring-green-300',
        warning: 'focus:ui-ring-yellow-300',
        error: 'focus:ui-ring-red-300',
      };

      const sizes = {
        default: 'ui-px-5 ui-py-2.5 ui-text-sm',
        xs: 'ui-py-2 ui-px-3 ui-text-xs',
        sm: 'ui-py-2 ui-px-3 ui-text-sm',
        lg: 'ui-py-3 ui-px-5 ui-text-base',
        xl: 'ui-py-3.5 ui-px-6 ui-text-base',
      };

      const bgClass = props.outline
        ? bgOutlineColors[props.color] ?? bgOutlineColors.default
        : bgColors[props.color] ?? bgColors.default;
      const textClass = props.outline
        ? textOutlineColors[props.color] ?? textOutlineColors.default
        : textColors[props.color] ?? textColors.default;
      const focusClass = focusColors[props.color] ?? focusColors.default;
      const sizeClass = sizes[props.size] ?? sizes.default;
      const blockClass = props.block
        ? 'ui-w-full ui-justify-center ui-text-center'
        : '';

      return [bgClass, textClass, focusClass, sizeClass, blockClass];
    });

    const iconClass = computed(() => {
      const baseClass = 'ui-mr-2 -ui-ml-1 ui-w-5 ui-h-5';

      return [baseClass];
    });

    const badgeClass = computed(() => {
      const baseClass = 'ui-ml-2';

      return [baseClass];
    });

    return { buttonClass, iconClass, badgeClass };
  },
});
</script>

<template>
  <button
    type="button"
    class="focus:ui-ring-4 ui-font-medium ui-rounded-lg ui-text-sm focus:ui-outline-none ui-flex ui-items-center disabled:ui-opacity-75"
    :class="buttonClass"
  >
    <svg
      v-if="loading"
      aria-hidden="true"
      role="status"
      class="ui-inline ui-mr-3 ui-w-4 ui-h-4 ui-text-white ui-animate-spin"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#E5E7EB"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
      />
    </svg>
    <slot name="icon" :icon-class="iconClass" v-if="!loading" />
    {{ loading ? 'Loading' : label }}
    <slot name="badge" :badge-class="badgeClass" v-if="!loading" />
  </button>
</template>
