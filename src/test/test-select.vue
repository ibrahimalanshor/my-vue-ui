<script setup>
import { reactive } from 'vue';
import { BaseSelect } from '@/components';

const select = reactive({
  options: [
    {
      key: 'all',
      value: null,
      label: 'Select',
    },
    {
      key: 'One',
      value: 'one',
      label: 'One',
    },
    {
      key: 'Two',
      value: 'two',
      label: 'Two',
    },
  ],
  colors: [null, 'primary', 'success', 'error', 'warning'],
  sizes: [null, 'sm', 'lg'],
  color: null,
  size: null,
  disabled: false,
  value: null,
});

const handleChange = () => {
  console.log(select.value);
};
</script>

<template>
  <div>
    <div class="mb-4">
      <select v-model="select.size">
        <option v-for="size in select.sizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
      <select v-model="select.color">
        <option v-for="color in select.colors" :key="color" :value="color">
          {{ color }}
        </option>
      </select>
      <input
        type="checkbox"
        id="select-disabled"
        :value="true"
        v-model="select.disabled"
      />
      <label for="select-disabled">Disabled</label>
    </div>
    {{ select.value }}
    <base-select
      :size="select.size"
      :color="select.color"
      :disabled="select.disabled"
      :options="select.options"
      v-model="select.value"
      v-on:change="handleChange"
    />
  </div>
</template>
