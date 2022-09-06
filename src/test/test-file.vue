<script setup>
import { reactive } from 'vue';
import { BaseFile } from '@/components';

const input = reactive({
  colors: [null, 'primary', 'success', 'error', 'warning'],
  color: null,
  disabled: false,
  value: null,
});

const handleChange = () => {
  console.log(input.value);
};
</script>

<template>
  <div>
    <div class="mb-4">
      <select v-model="input.color">
        <option v-for="color in input.colors" :key="color" :value="color">
          {{ color }}
        </option>
      </select>
      <input
        type="checkbox"
        id="file-disabled"
        :value="true"
        v-model="input.disabled"
      />
      <label for="file-disabled">Disabled</label>
    </div>
    {{ input.value }}
    <base-file
      :color="input.color"
      :disabled="input.disabled"
      v-model="input.value"
      v-on:change="handleChange"
    />
  </div>
</template>
