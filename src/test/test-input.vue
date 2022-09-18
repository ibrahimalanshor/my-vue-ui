<script setup>
import { reactive } from 'vue';
import { BaseInput } from '@/components';

const input = reactive({
  colors: [null, 'primary', 'success', 'error', 'warning'],
  sizes: [null, 'sm', 'lg'],
  color: null,
  size: null,
  disabled: false,
  readonly: false,
  block: true,
  value: null,
});

const handleChange = () => {
  console.log(input.value);
};
</script>

<template>
  <div>
    <div class="ui-mb-4">
      <select v-model="input.size">
        <option v-for="size in input.sizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
      <select v-model="input.color">
        <option v-for="color in input.colors" :key="color" :value="color">
          {{ color }}
        </option>
      </select>
      <input
        type="checkbox"
        id="input-disabled"
        :value="true"
        v-model="input.disabled"
      />
      <label for="input-disabled">Disabled</label>
      <input
        type="checkbox"
        id="input-readonly"
        :value="true"
        v-model="input.readonly"
      />
      <label for="input-readonly">Readonly</label>
      <input
        type="checkbox"
        id="input-block"
        :value="true"
        v-model="input.block"
      />
      <label for="input-block">Block</label>
    </div>
    {{ input.value }}
    <base-input
      :size="input.size"
      :color="input.color"
      :disabled="input.disabled"
      :block="input.block"
      :readonly="input.readonly"
      v-model="input.value"
      v-on:change="handleChange"
    />
  </div>
</template>
