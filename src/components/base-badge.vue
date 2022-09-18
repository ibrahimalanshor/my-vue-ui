<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'base-badge',
  props: {
    label: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'default',
    },
    circle: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const badgeClass = computed(() => {
      const bgColors = {
        default: 'ui-bg-gray-100',
        primary: 'ui-bg-blue-100',
        success: 'ui-bg-green-100',
        warning: 'ui-bg-yellow-100',
        error: 'ui-bg-red-100',
      };

      const textColors = {
        default: 'ui-text-gray-800',
        primary: 'ui-text-blue-800',
        success: 'ui-text-green-800',
        warning: 'ui-text-yellow-800',
        error: 'ui-text-red-800',
      };

      const bgClass = bgColors[props.color] ?? bgColors.default;
      const textClass = textColors[props.color] ?? textColors.default;
      const circleClass = props.circle
        ? 'ui-w-4 ui-h-4 ui-p-0 ui-rounded-full'
        : 'ui-px-2.5 ui-py-0.5';

      return [bgClass, textClass, circleClass];
    });

    return { badgeClass };
  },
});
</script>

<template>
  <span class="ui-text-xs ui-font-semibold" :class="badgeClass">{{
    label
  }}</span>
</template>
