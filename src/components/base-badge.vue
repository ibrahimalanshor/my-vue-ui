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
        default: 'bg-gray-100',
        primary: 'bg-blue-100',
        success: 'bg-green-100',
        warning: 'bg-yellow-100',
        error: 'bg-red-100',
      };

      const textColors = {
        default: 'text-gray-800',
        primary: 'text-blue-800',
        success: 'text-green-800',
        warning: 'text-yellow-800',
        error: 'text-red-800',
      };

      const bgClass = bgColors[props.color] ?? bgColors.default;
      const textClass = textColors[props.color] ?? textColors.default;
      const circleClass = props.circle
        ? 'w-4 h-4 p-0 rounded-full'
        : 'px-2.5 py-0.5';

      return [bgClass, textClass, circleClass];
    });

    return { badgeClass };
  },
});
</script>

<template>
  <span class="text-xs font-semibold" :class="badgeClass">{{ label }}</span>
</template>
