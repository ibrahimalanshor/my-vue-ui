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
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const value = ref(props.modelValue);

    const inputClass = computed(() => {
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

      const colorClass = colors[props.color] ?? colors.default;

      return [colorClass];
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
    class="block w-full text-sm rounded-lg border cursor-pointer disabled:bg-gray-100"
    :class="inputClass"
    type="file"
    v-on:change="handleChange"
  />
</template>
