<script setup>
import { computed, ref, watch } from 'vue';
import BaseInput from './base-input.vue';

const props = defineProps({
  modelValue: String,
  label: String,
  id: String,
  helper: String,
  placeholder: {
    type: String,
    default: 'Placeholder',
  },
  size: {
    type: String,
    default: 'default',
  },
  type: {
    type: String,
    default: 'text',
  },
  color: {
    type: String,
    default: 'default',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'change']);

const value = ref(props.modelValue);

const labelClass = computed(() => {
  const colors = {
    default: 'text-gray-900',
    primary: 'text-blue-700',
    success: 'text-green-700',
    warning: 'text-yellow-500',
    error: 'text-red-700',
  };

  const colorClass = colors[props.color] ?? colors.default;

  return [colorClass];
});
const helperClass = computed(() => {
  const colors = {
    default: 'text-gray-500',
    primary: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-500',
    error: 'text-red-600',
  };

  const colorClass = colors[props.color] ?? colors.default;

  return [colorClass];
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
</script>

<template>
  <div>
    <label
      :for="props.id"
      class="block mb-2 text-sm font-medium"
      :class="labelClass"
      >{{ props.label }}</label
    >
    <slot>
      <base-input
        :id="props.id"
        :type="props.type"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :size="props.size"
        :color="props.color"
        v-model="value"
        v-on:change="handleChange"
      ></base-input>
    </slot>
    <p class="mt-2 text-sm" :class="helperClass" v-if="props.helper">
      {{ props.helper }}
    </p>
  </div>
</template>
