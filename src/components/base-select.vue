<script>
import { computed, ref, watch, defineComponent } from 'vue';

export default defineComponent({
  name: 'base-select',
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
    options: {
      type: Array,
      required: true,
    },
    block: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const value = ref(props.modelValue);

    const selectClass = computed(() => {
      const sizes = {
        default: 'p-2.5 text-sm',
        sm: 'p-2 text-sm',
        lg: 'py-3 px-4 text-base',
      };
      const colors = {
        default:
          'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500',
        primary:
          'bg-blue-50 border-blue-500 text-blue-900 placeholder-blue-700 focus:ring-blue-500 focus:border-blue-500',
        success:
          'bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500',
        warning:
          'bg-yellow-50 border-yellow-400 text-yellow-700 placeholder-yellow-500 focus:ring-yellow-400 focus:border-yellow-400',
        error:
          'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500',
      };

      const sizeClass = sizes[props.size] ?? sizes.default;
      const colorClass = colors[props.color] ?? colors.default;
      const blockClass = props.block ? 'w-full' : '';

      return [sizeClass, colorClass, blockClass];
    });

    const handleChange = () => {
      emit('update:modelValue', value.value);
      emit('change', value.value);
    };

    watch(
      () => props.modelValue,
      () => {
        value.value = props.modelValue;
      }
    );

    return { value, selectClass, handleChange };
  },
});
</script>

<template>
  <select
    class="border text-sm rounded-lg block disabled:bg-gray-100"
    :class="selectClass"
    v-model="value"
    v-on:change="handleChange"
  >
    <option v-for="option in options" :key="option.key" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
