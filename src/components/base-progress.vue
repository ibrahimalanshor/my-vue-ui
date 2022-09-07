<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'base-progress',
  props: {
    width: {
      type: Number,
      default: 100,
    },
    withLabel: {
      type: Boolean,
      default: false,
    },
    customLabel: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'default',
    },
    label: String,
  },
  setup(props) {
    const wrapperClass = computed(() => {
      const sizeClass = props.withLabel ? '' : 'h-2.5';

      return [sizeClass];
    });

    const contentClass = computed(() => {
      const bgColors = {
        default: 'bg-gray-300',
        primary: 'bg-blue-600',
        success: 'bg-green-600',
        warning: 'bg-yellow-400',
        error: 'bg-red-600',
      };

      const textColors = {
        default: 'text-gray-800',
        primary: 'text-blue-100',
        success: 'text-green-100',
        warning: 'text-yellow-100',
        error: 'text-red-100',
      };

      const bgClass = props.outline
        ? bgOutlineColors[props.color] ?? bgOutlineColors.default
        : bgColors[props.color] ?? bgColors.default;
      const textClass = props.outline
        ? textOutlineColors[props.color] ?? textOutlineColors.default
        : textColors[props.color] ?? textColors.default;
      const sizeClass = props.withLabel ? 'p-0.5' : 'h-2.5';

      return [bgClass, textClass, sizeClass];
    });

    const text = computed(() => {
      return props.customLabel ? props.label : `${props.width}%`;
    });

    return { wrapperClass, contentClass, text };
  },
});
</script>

<template>
  <div class="w-full bg-gray-200 rounded-full" :class="wrapperClass">
    <div
      class="rounded-full transition-all text-xs font-medium text-center p-0.5 leading-none"
      :class="contentClass"
      :style="{ width: `${width}%` }"
    >
      <template v-if="withLabel">
        {{ text }}
      </template>
    </div>
  </div>
</template>
