<script>
import { ref, watch, defineComponent } from 'vue';

export default defineComponent({
  name: 'base-radio',
  props: {
    modelValue: null,
    id: String,
    value: String,
    label: String,
    name: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const checked = ref(props.modelValue);

    const handleChange = () => {
      emit('update:modelValue', checked.value);
      emit('change', checked.value);
    };

    watch(
      () => props.modelValue,
      () => {
        checked.value = props.modelValue;
      }
    );

    return { checked, handleChange };
  },
});
</script>

<template>
  <div class="ui-flex ui-items-center ui-space-x-2">
    <input
      :id="id"
      :name="name"
      type="radio"
      class="ui-w-4 ui-h-4 ui-text-blue-600 ui-bg-gray-100 ui-border-gray-300 focus:ui-ring-blue-500 focus:ui-ring-2"
      :value="value"
      :disabled="disabled"
      v-model="checked"
      v-on:change="handleChange"
    />
    <label :for="id" class="ui-text-sm ui-font-medium ui-text-gray-900">{{
      label
    }}</label>
  </div>
</template>
