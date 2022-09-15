<script>
import { computed, ref, watch, defineComponent } from 'vue';
import BaseInput from './base-input.vue';

export default defineComponent({
  name: 'base-form',
  components: { BaseInput },
  props: {
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
    autofocus: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
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

    return { labelClass, value, handleChange, helperClass };
  },
});
</script>

<template>
  <div>
    <label
      :for="id"
      class="block mb-2 text-sm font-medium"
      :class="labelClass"
      >{{ label }}</label
    >
    <slot>
      <base-input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :autofocus="autofocus"
        :block="block"
        :size="size"
        :color="color"
        v-model="value"
        v-on:change="handleChange"
      ></base-input>
    </slot>
    <p class="mt-2 text-sm" :class="helperClass" v-if="helper">
      {{ helper }}
    </p>
  </div>
</template>
