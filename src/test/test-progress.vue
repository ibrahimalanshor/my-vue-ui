<script setup>
import { reactive } from 'vue';
import { BaseProgress } from '@/components';

const progress = reactive({
  colors: [null, 'primary', 'success', 'error', 'warning'],
  width: 100,
  withLabel: false,
  customLabel: false,
  label: '',
  color: null,
});
</script>

<template>
  <select v-model="progress.color">
    <option v-for="color in progress.colors" :key="color" :value="color">
      {{ color }}
    </option>
  </select>
  <input type="number" v-model="progress.width" />
  <input
    type="checkbox"
    :value="true"
    id="progress-with-label"
    v-model="progress.withLabel"
  />
  <label for="progress-with-label">With Label</label>
  <input
    type="checkbox"
    :value="true"
    id="progress-custom-label"
    v-model="progress.customLabel"
  />
  <label for="progress-custom-label">Custom Label</label>
  <input type="text" v-model="progress.label" />
  <base-progress
    :width="progress.width"
    :with-label="progress.withLabel"
    :custom-label="progress.customLabel"
    :label="progress.label"
    :color="progress.color"
  />
</template>
