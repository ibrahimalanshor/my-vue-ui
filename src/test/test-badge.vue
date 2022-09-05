<script setup>
import { BaseBadge } from '@/components';
import { reactive } from 'vue';

const badge = reactive({
  colors: [null, 'primary', 'success', 'error', 'warning'],
  color: null,
  text: 'Badge',
});
</script>

<template>
  <div class="mb-4">
    <input v-model="badge.text" type="text" placeholder="Badge Text" />
    <select v-model="badge.color">
      <option v-for="color in badge.colors" :key="color" :value="color">
        {{ color }}
      </option>
    </select>
  </div>

  <base-badge :label="badge.text" :color="badge.color" />
</template>
