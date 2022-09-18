<script>
import { computed, ref, watch, defineComponent } from 'vue';

export default defineComponent({
  name: 'base-file',
  props: {
    modelValue: String,
    color: {
      type: String,
      default: 'default',
    },
    block: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const value = ref(props.modelValue);

    const inputClass = computed(() => {
      const colors = {
        default:
          'ui-bg-gray-50 ui-border-gray-300 ui-text-gray-900 focus:ui-ring-blue-500 focus:ui-border-blue-500',
        primary:
          'ui-bg-blue-50 ui-border-blue-500 ui-text-blue-900 ui-placeholder-blue-700 focus:ui-ring-blue-500 focus:ui-border-blue-500',
        success:
          'ui-bg-green-50 ui-border-green-500 ui-text-green-900 ui-placeholder-green-700 focus:ui-ring-green-500 focus:ui-border-green-500',
        warning:
          'ui-bg-yellow-50 ui-border-yellow-400 ui-text-yellow-700 ui-placeholder-yellow-500 focus:ui-ring-yellow-400 focus:ui-border-yellow-400',
        error:
          'ui-bg-red-50 ui-border-red-500 ui-text-red-900 ui-placeholder-red-700 focus:ui-ring-red-500 focus:ui-border-red-500',
      };

      const colorClass = colors[props.color] ?? colors.default;
      const blockClass = props.block ? 'ui-w-full' : '';

      return [colorClass, blockClass];
    });

    const handleChange = (e) => {
      value.value = e.target.value;

      emit('update:modelValue', value.value);
      emit('change', value.value);
    };

    watch(
      () => props.modelValue,
      () => {
        value.value = props.modelValue;
      }
    );

    return { inputClass, handleChange };
  },
});
</script>

<template>
  <input
    class="ui-block ui-text-sm ui-rounded-lg ui-border ui-cursor-pointer disabled:ui-bg-gray-100"
    :class="inputClass"
    type="file"
    v-on:change="handleChange"
  />
</template>
