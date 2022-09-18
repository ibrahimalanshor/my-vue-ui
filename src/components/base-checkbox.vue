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
  <div class="ui-flex ui-items-center ui-space-x-2">
    <input
      :id="id"
      type="checkbox"
      class="ui-w-4 ui-h-4 ui-text-blue-600 ui-bg-gray-100 ui-rounded ui-border-gray-300 focus:ui-ring-blue-500 focus:ui-ring-2"
      :disabled="disabled"
      v-model="value"
      v-on:change="handleChange"
    />
    <label :for="id" class="ui-text-sm ui-font-medium ui-text-gray-900">{{
      label
    }}</label>
  </div>
</template>
