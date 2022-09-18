<script setup>
import { BaseSpinner } from '@/components';
import { reactive } from 'vue';

const spinner = reactive({
  colors: [null, 'primary', 'success', 'error', 'warning'],
  color: null,
});
</script>

<template>
  <div class="ui-mb-4">
    <select v-model="spinner.color">
      <option v-for="color in spinner.colors" :key="color" :value="color">
        {{ color }}
      </option>
    </select>
  </div>

  <base-spinner :color="spinner.color" />
</template>
