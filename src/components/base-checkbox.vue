<script>
import { ref, watch, defineComponent } from 'vue';

export default defineComponent({
  name: 'base-checkbox',
  props: {
    modelValue: null,
    id: String,
    label: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const value = ref(props.modelValue);

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

    return { value, handleChange };
  },
});
</script>

<template>
  <div class="flex items-center space-x-2">
    <input
      :id="id"
      type="checkbox"
      class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
      :disabled="disabled"
      v-model="value"
      v-on:change="handleChange"
    />
    <label :for="id" class="text-sm font-medium text-gray-900">{{
      label
    }}</label>
  </div>
</template>
