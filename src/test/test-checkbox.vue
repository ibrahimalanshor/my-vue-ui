<script setup>
import { reactive } from 'vue';
import { BaseCheckbox } from '@/components';

const checkbox = reactive({
  model: false,
});

const handleChange = () => console.log('onchange');
</script>

<template>
  <div>
    {{ checkbox.model }}
    <base-checkbox
      label="namun"
      id="test-checkbox"
      v-model="checkbox.model"
      v-on:change="handleChange"
    ></base-checkbox>
  </div>
</template>
