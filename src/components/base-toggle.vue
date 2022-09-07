<script>
import { ref, watch, defineComponent } from 'vue';

export default defineComponent({
  name: 'base-toggle',
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
  <label :for="id" class="relative flex items-center">
    <input
      :id="id"
      type="checkbox"
      class="sr-only peer"
      :disabled="disabled"
      v-model="value"
      v-on:change="handleChange"
    />
    <div
      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
    ></div>
    <span class="text-sm font-medium text-gray-900 ml-2" v-if="label">{{
      label
    }}</span>
  </label>
</template>
