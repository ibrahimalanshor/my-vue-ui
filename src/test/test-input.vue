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
});
</script>

<template>
  <div>
    <div class="mb-4">
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
    </div>
    <base-input
      :size="input.size"
      :color="input.color"
      :disabled="input.disabled"
      :readonly="input.readonly"
    />
  </div>
</template>
