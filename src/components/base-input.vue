<script>
import { computed, ref, watch, defineComponent } from 'vue';

export default defineComponent({
  name: 'base-input',
  props: {
    modelValue: null,
    size: {
      type: String,
      default: 'default',
    },
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
      const sizes = {
        default: 'ui-p-2.5 ui-text-sm',
        sm: 'ui-p-2 ui-text-xs',
        lg: 'ui-p-4 ui-text-md',
      };
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

      const sizeClass = sizes[props.size] ?? sizes.default;
      const colorClass = colors[props.color] ?? colors.default;
      const blockClass = props.block ? 'ui-w-full' : '';

      return [sizeClass, colorClass, blockClass];
    });

    const handleInput = () => {
      emit('update:modelValue', value.value);
      emit('change', value.value);
    };

    watch(
      () => props.modelValue,
      () => {
        value.value = props.modelValue;
      }
    );

    return { inputClass, value, handleInput };
  },
});
</script>

<template>
  <input
    type="text"
    class="ui-border ui-rounded-lg block disabled:ui-bg-gray-100 read-only:ui-bg-gray-100"
    :class="inputClass"
    v-model="value"
    v-on:input="handleInput"
    placeholder="Placeholder"
  />
</template>
