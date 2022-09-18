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
      const sizeClass = props.withLabel ? '' : 'ui-h-2.5';

      return [sizeClass];
    });

    const contentClass = computed(() => {
      const bgColors = {
        default: 'ui-bg-gray-300',
        primary: 'ui-bg-blue-600',
        success: 'ui-bg-green-600',
        warning: 'ui-bg-yellow-400',
        error: 'ui-bg-red-600',
      };

      const textColors = {
        default: 'ui-text-gray-800',
        primary: 'ui-text-blue-100',
        success: 'ui-text-green-100',
        warning: 'ui-text-yellow-100',
        error: 'ui-text-red-100',
      };

      const bgClass = props.outline
        ? bgOutlineColors[props.color] ?? bgOutlineColors.default
        : bgColors[props.color] ?? bgColors.default;
      const textClass = props.outline
        ? textOutlineColors[props.color] ?? textOutlineColors.default
        : textColors[props.color] ?? textColors.default;
      const sizeClass = props.withLabel ? 'ui-p-0.5' : 'ui-h-2.5';

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
  <div class="ui-w-full ui-bg-gray-200 ui-rounded-full" :class="wrapperClass">
    <div
      class="ui-rounded-full ui-transition-all ui-text-xs ui-font-medium ui-text-center ui-p-0.5 ui-leading-none"
      :class="contentClass"
      :style="{ width: `${width}%` }"
    >
      <template v-if="withLabel">
        {{ text }}
      </template>
    </div>
  </div>
</template>
