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
  <label :for="id" class="ui-relative ui-flex ui-items-center">
    <input
      :id="id"
      type="checkbox"
      class="ui-sr-only ui-peer"
      :disabled="disabled"
      v-model="value"
      v-on:change="handleChange"
    />
    <div
      class="ui-w-11 ui-h-6 ui-bg-gray-200 peer-focus:ui-outline-none peer-focus:ui-ring-4 peer-focus:ui-ring-blue-300 ui-rounded-full peer peer-checked:after:ui-translate-x-full peer-checked:after:ui-border-white after:ui-content-[''] after:ui-absolute after:ui-top-[2px] after:ui-left-[2px] after:ui-bg-white after:ui-border-gray-300 after:ui-border after:ui-rounded-full after:ui-h-5 after:ui-w-5 after:ui-transition-all peer-checked:ui-bg-blue-600"
    ></div>
    <span
      class="ui-text-sm ui-font-medium ui-text-gray-900 ui-ml-2"
      v-if="label"
      >{{ label }}</span
    >
  </label>
</template>
