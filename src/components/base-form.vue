<script>
import { computed, ref, watch, defineComponent } from 'vue';
import BaseInput from './base-input.vue';

export default defineComponent({
  name: 'base-form',
  components: { BaseInput },
  props: {
    modelValue: String,
    label: String,
    labelRight: String,
    id: String,
    helper: String,
    button: String,
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
    withButton: {
      type: Boolean,
      default: false,
    },
    withLabelRight: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change', 'click-button'],
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
    const buttonClass = computed(() => {
      const sizes = {
        default: 'top-2.5 right-4 text-sm',
        sm: 'top-2 right-3 text-xs',
        lg: 'top-4 right-5 text-md',
      };

      return [sizes[props.size] ?? sizes.default];
    });

    const handleChange = () => {
      emit('update:modelValue', value.value);
      emit('change', value.value);
    };
    const handleClickButton = () => {
      emit('click-button');
    };

    watch(
      () => props.modelValue,
      () => {
        value.value = props.modelValue;
      }
    );

    return {
      labelClass,
      value,
      handleChange,
      handleClickButton,
      helperClass,
      buttonClass,
    };
  },
});
</script>

<template>
  <div :class="[block ? 'w-full' : 'w-[fit-content]']">
    <div class="flex items-center align-center justify-between mb-2">
      <label :for="id" class="block text-sm font-medium" :class="labelClass">{{
        label
      }}</label>
      <div class="text-sm" v-if="withLabelRight">
        <slot name="label-right">
          <span>{{ labelRight }}</span>
        </slot>
      </div>
    </div>
    <slot>
      <div class="relative">
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
        <button
          class="absolute text-gray-500"
          :class="buttonClass"
          v-if="withButton"
          v-on:click="handleClickButton"
        >
          <slot name="button">
            {{ button }}
          </slot>
        </button>
      </div>
    </slot>
    <p class="mt-2 text-sm" :class="helperClass" v-if="helper">
      {{ helper }}
    </p>
  </div>
</template>
