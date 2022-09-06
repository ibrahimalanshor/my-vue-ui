<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: null,
  id: String,
  label: String,
});
const emit = defineEmits(['update:modelValue', 'change']);

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
</script>

<template>
  <div class="flex items-center space-x-2">
    <input
      :id="props.id"
      type="checkbox"
      class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
      v-model="value"
      v-on:change="handleChange"
    />
    <label :for="props.id" class="text-sm font-medium text-gray-900">{{
      props.label
    }}</label>
  </div>
</template>
