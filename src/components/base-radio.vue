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
  <div class="flex items-center space-x-2">
    <input
      :id="id"
      :name="name"
      type="radio"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
      :value="value"
      :disabled="disabled"
      v-model="checked"
      v-on:change="handleChange"
    />
    <label :for="id" class="text-sm font-medium text-gray-900">{{
      label
    }}</label>
  </div>
</template>
